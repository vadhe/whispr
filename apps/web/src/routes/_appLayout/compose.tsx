import { createFileRoute } from "@tanstack/react-router";
import Compose from "#/components/pages/Compose";

export const Route = createFileRoute("/_appLayout/compose")({
	component: Compose,
});
