// VODA approval email App.jsx patch

async function sendApprovalEmail(employee) {
  if (!employee?.email) return;

  const { error } = await supabase.functions.invoke("send-approval-email", {
    body: {
      email: employee.email,
      name: employee.name || employee.fullName || employee.email,
    },
  });

  if (error) {
    setAppError(
      `Employee was approved, but the approval email could not be sent: ${error.message}`
    );
  }
}

// Replace your existing approveEmployee(profileId) with this:

async function approveEmployee(profileId) {
  setAppError("");

  const employee = employees.find((person) => person.id === profileId);

  const { error } = await supabase
    .from("profiles")
    .update({
      approval_status: "approved",
      approved_by: currentUser.id,
      approved_at: new Date().toISOString(),
      denied_by: null,
      denied_at: null,
      role: "employee",
      updated_at: new Date().toISOString(),
    })
    .eq("id", profileId);

  if (error) {
    setAppError(error.message);
    return;
  }

  await createPortalMessage({
    recipientId: profileId,
    title: "Account approved",
    body:
      "Your VODA employee portal account has been approved. You can now log in and submit hours.",
  });

  if (employee?.email) {
    await sendApprovalEmail(employee);
  }

  await loadAppData();
}