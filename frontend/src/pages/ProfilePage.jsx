import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Skeleton } from "../components/ui/skeleton";
import { useAuth } from "../contexts/AuthContext";
import { updateUsername } from "../lib/api";

function ProfilePage() {
  const { user, loading: authLoading, updateUserContext } = useAuth(); // Assuming updateUserContext exists to update auth state
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Email is for display, not updated by this API call

  const [isPublic, setIsPublic] = useState(false); // Example, not handled by current API integration
  const [darkMode, setDarkMode] = useState(false); // Example, not handled by current API integration

  useEffect(() => {
    if (!authLoading && user) {
      setName(user.username || "");
      // Populate email from user context or a default based on address
      setEmail(user.email || (user.address ? `${user.address.substring(0,10).toLowerCase()}@example.com` : ""));
      // TODO: Populate isPublic and darkMode if they are part of your user object from AuthContext
      // setIsPublic(user.isPublic || false);
      // setDarkMode(user.darkMode || false);
      setIsLoading(false);
    } else if (!authLoading && !user) {
      // Handle case where user is not logged in (e.g., redirect or show message)
      setIsLoading(false);
      // Consider redirecting: navigate('/login');
    }
  }, [user, authLoading]);

  const handleSaveProfile = async () => {
    if (!user || !user.address) {
      alert("User not found. Please log in again.");
      return;
    }
    if (!name.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      const updatedUser = await updateUsername(user.address, name);
      alert("Username updated successfully!");
      // Optionally, update the user context if the backend returns the full updated user object
      // and if your useAuth hook has a way to update the user state, e.g.:
      if (updateUserContext && updatedUser) {
         // Assuming backend returns { UserId, Username, ... } or similar
         // And your AuthContext user object has a 'username' field
        updateUserContext({ ...user, username: updatedUser.Username || name });
      }
      setName(updatedUser.Username || name); // Update local state with confirmed new name
    } catch (error) {
      console.error("Failed to update username:", error);
      alert(`Failed to update username: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C223F] text-slate-200 p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-slate-400">
          Manage your account and preferences
        </p>
      </header>

      <Card className="bg-[#242A4D] text-slate-200">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <Skeleton className="h-4 w-1/2 bg-slate-600" />
          ) : (
            <div className="grid gap-1">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {isLoading ? (
            <Skeleton className="h-4 w-2/3 bg-slate-600" />
          ) : (
            <div className="grid gap-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSaveProfile}
            disabled={isLoading || isSaving} // Updated disabled state
            className="bg-violet-600 hover:bg-violet-700"
          >
            Save Profile
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-[#242A4D] text-slate-200">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Control your privacy and appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-[80%] bg-slate-600" />
              <Skeleton className="h-4 w-[70%] bg-slate-600" />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="publicProfile"
                    className="text-sm font-medium"
                  >
                    Public Profile
                  </Label>
                  <p className="text-sm text-slate-400">
                    Allow others to see your profile info
                  </p>
                </div>
                <Switch
                  id="publicProfile"
                  checked={isPublic}
                  onCheckedChange={(value) => setIsPublic(value)}
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSaveProfile} // TODO: Should have its own handler for preferences
            disabled={isLoading || isSaving} // Aligning disabled state
            className="bg-violet-600 hover:bg-violet-700"
          >
            Save Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProfilePage;
