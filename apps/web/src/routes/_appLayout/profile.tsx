import { createFileRoute } from "@tanstack/react-router";
import Profile from "#/components/pages/Profile";

export const Route = createFileRoute("/_appLayout/profile")({
	component: Profile,
});
