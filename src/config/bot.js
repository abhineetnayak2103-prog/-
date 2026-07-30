@@
   commands: {
     // Bot owner user IDs (comma-separated in OWNER_IDS env var).
     // Owners can access owner/admin-level bot commands.
-    owners: process.env.OWNER_IDS?.split(",").map((id) => id.trim()).filter(Boolean) || [],
+    owners: process.env.OWNER_IDS?.split(",").map((id) => id.trim()).filter(Boolean) || [],
+    // Co-owner IDs: additional accounts that should be treated like owners.
+    // Set via CO_OWNER_IDS (comma-separated).
+    coOwners: process.env.CO_OWNER_IDS?.split(",").map((id) => id.trim()).filter(Boolean) || [],
@@
 export function getBotOwners() {
-  return (botConfig.commands?.owners ?? [])
-    .map((id) => String(id).trim())
-    .filter(Boolean);
+  const owners = (botConfig.commands?.owners ?? [])
+    .map((id) => String(id).trim())
+    .filter(Boolean);
+  const coOwners = (botConfig.commands?.coOwners ?? [])
+    .map((id) => String(id).trim())
+    .filter(Boolean);
+  // Merge and dedupe owners + coOwners
+  return Array.from(new Set([...owners, ...coOwners]));
 }
