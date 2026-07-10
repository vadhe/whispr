import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
	HelpCircle,
	Inbox,
	LogOut,
	Plus,
	SettingsIcon,
	UserCircle,
} from "lucide-react";

export const Route = createFileRoute("/_appLayout")({
	component: AppLayout,
});

function AppLayout() {
	const isActive = (path: string) => window.location.pathname === path;
	return (
		<div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex">
			{/* Desktop Sidebar */}
			<aside className="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-surface-container-low/50 backdrop-blur-2xl border-r border-border z-40 p-6 gap-4">
				<div className="font-heading text-primary font-bold mb-8 text-2xl tracking-tight">
					Whispr
				</div>

				<nav className="flex flex-col gap-2 flex-grow">
					<Link
						to="/inbox"
						className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/inbox") ? "bg-secondary/30 text-primary border-r-4 border-primary hover:translate-x-1" : "text-muted-foreground hover:text-foreground hover:bg-white/10 hover:translate-x-1"}`}
					>
						<Inbox className="w-5 h-5" />
						<span className="font-sans font-medium">Inbox</span>
					</Link>
					<Link
						to="/profile"
						className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/profile") ? "bg-secondary/30 text-primary border-r-4 border-primary hover:translate-x-1" : "text-muted-foreground hover:text-foreground hover:bg-white/10 hover:translate-x-1"}`}
					>
						<UserCircle className="w-5 h-5" />
						<span className="font-sans font-medium">Profile</span>
					</Link>
					<Link
						to="/settings"
						className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/settings") ? "bg-secondary/30 text-primary border-r-4 border-primary shadow-[4px_0_15px_-5px_rgba(192,193,255,0.5)]" : "text-muted-foreground hover:text-foreground hover:bg-white/10"}`}
					>
						<SettingsIcon className="w-5 h-5" />
						<span className="font-sans font-medium">Settings</span>
					</Link>
				</nav>

				<div className="mt-auto flex flex-col gap-2">
					<Link
						to="/compose"
						className="w-full py-3 px-4 text-center rounded-xl bg-primary text-primary-foreground font-medium shadow-[0_0_15px_rgba(192,193,255,0.3)] active:scale-95 transition-all"
					>
						New Link
					</Link>
					<div className="flex flex-col pt-4 border-t border-white/5 gap-1">
						<button
							type="button"
							className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
						>
							<HelpCircle className="w-4 h-4" /> Support
						</button>
						<button
							type="button"
							className="flex items-center gap-3 px-4 py-2 text-destructive hover:text-destructive/80 text-sm transition-colors"
						>
							<LogOut className="w-4 h-4" /> Logout
						</button>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="w-full md:ml-64 relative min-h-screen pb-24 md:pb-8">
				<Outlet />
			</main>

			{/* Mobile Bottom Nav */}
			<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-background/80 backdrop-blur-lg border-t border-border rounded-t-xl md:hidden">
				<Link
					to="/inbox"
					className={`flex flex-col items-center justify-center transition-all duration-200 ${isActive("/inbox") ? "text-primary font-bold scale-110" : "text-muted-foreground"}`}
				>
					<Inbox className="w-6 h-6" />
					<span className="text-[10px] font-medium mt-1">Inbox</span>
				</Link>
				<Link
					to="/profile"
					className={`flex flex-col items-center justify-center transition-all duration-200 ${isActive("/profile") ? "text-primary font-bold scale-110" : "text-muted-foreground"}`}
				>
					<UserCircle className="w-6 h-6" />
					<span className="text-[10px] font-medium mt-1">Profile</span>
				</Link>
				<Link
					to="/settings"
					className={`flex flex-col items-center justify-center transition-all duration-200 ${isActive("/settings") ? "text-primary font-bold scale-110" : "text-muted-foreground"}`}
				>
					<SettingsIcon className="w-6 h-6" />
					<span className="text-[10px] font-medium mt-1">Settings</span>
				</Link>
			</nav>

			{/* Mobile FAB */}
			<Link
				to="/compose"
				className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40"
			>
				<Plus className="w-8 h-8" />
			</Link>
		</div>
	);
}
