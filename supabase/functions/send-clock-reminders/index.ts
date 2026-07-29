import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const corsHeaders = { "Content-Type": "application/json" };

Deno.serve(async () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
  const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;
  const vapidSubject = Deno.env.get("VAPID_SUBJECT") || "mailto:admin@vodaoftucson.com";
  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const nowPhoenix = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Phoenix" }));
  const weekday = nowPhoenix.getDay();
  if (weekday === 0 || weekday === 6) return new Response(JSON.stringify({ skipped: "weekend" }), { headers: corsHeaders });
  const today = `${nowPhoenix.getFullYear()}-${String(nowPhoenix.getMonth() + 1).padStart(2, "0")}-${String(nowPhoenix.getDate()).padStart(2, "0")}`;

  const { data: subscriptions, error } = await supabase.from("push_subscriptions").select("user_id,endpoint,p256dh,auth").eq("enabled", true);
  if (error) throw error;
  const { data: accessed } = await supabase.from("app_daily_activity").select("user_id").eq("activity_date", today);
  const accessedIds = new Set((accessed || []).map((row) => row.user_id));
  const { data: clocked } = await supabase.from("time_entries").select("employee_id").eq("work_date", today);
  const clockedIds = new Set((clocked || []).map((row) => row.employee_id));

  let sent = 0;
  for (const subscription of subscriptions || []) {
    if (accessedIds.has(subscription.user_id) || clockedIds.has(subscription.user_id)) continue;
    try {
      await webpush.sendNotification({ endpoint: subscription.endpoint, keys: { p256dh: subscription.p256dh, auth: subscription.auth } }, JSON.stringify({ title: "Time clock reminder", body: "Good morning — remember to start your VODA time clock for today.", tag: `clock-${today}`, url: "/" }));
      sent += 1;
    } catch (pushError) {
      if ([404, 410].includes(pushError?.statusCode)) await supabase.from("push_subscriptions").update({ enabled: false }).eq("endpoint", subscription.endpoint);
    }
  }
  return new Response(JSON.stringify({ sent, date: today }), { headers: corsHeaders });
});
