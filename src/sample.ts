function getUser(id: number) {
  return {
    id: id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "student",
    isActive: true,
  };
}

function verifyClaim(claimerRole: string, isItemValuable: boolean): "Auto-Approved" | "Requires Verification" | "Rejected" {
  if (claimerRole === "security_admin") return "Auto-Approved";
  if (isItemValuable) return "Requires Verification";
  return "Auto-Approved";
}

function formatLostFoundItem(title: string, location: string, type: "lost" | "found") {
  return `[${type.toUpperCase()}] ${title} at ${location}`;
}

const sampleUser = getUser(1);
console.log("Sample User:", sampleUser);
console.log("Verification check for valuable item claimed by student:", verifyClaim("student", true));
console.log(formatLostFoundItem("iPhone 15 Pro", "College Library", "found"));