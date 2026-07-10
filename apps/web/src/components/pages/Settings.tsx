import { CheckCircle, Copy, Loader2, Save, Shield, User } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Switch } from "#/components/ui/switch";

export default function Settings() {
	const [isSaving, setIsSaving] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	const [allowImages, setAllowImages] = useState(true);
	const [autoFilter, setAutoFilter] = useState(true);
	const [privateProfile, setPrivateProfile] = useState(false);

	const handleSave = () => {
		setIsSaving(true);
		setTimeout(() => {
			setIsSaving(false);
			setIsSaved(true);
			setTimeout(() => setIsSaved(false), 2000);
		}, 1200);
	};

	return (
		<div className="pt-20 md:pt-12 pb-24 md:pb-12 px-4 md:px-10 max-w-[768px] mx-auto min-h-screen">
			<header className="mb-12">
				<h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">
					Settings
				</h1>
				<p className="text-muted-foreground">
					Configure your account and privacy preferences.
				</p>
			</header>

			<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
				{/* Account Group */}
				<section className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
					<div className="flex items-center gap-3 mb-2">
						<User className="w-6 h-6 text-primary" />
						<h2 className="font-heading text-2xl font-bold text-foreground">
							Account
						</h2>
					</div>

					<div className="space-y-6">
						<div className="flex flex-col gap-2 group">
							{/* biome-ignore lint/a11y/noLabelWithoutControl: hvhvh */}
							<label className="font-medium text-sm text-muted-foreground">
								Username
							</label>
							<Input
								className="bg-transparent border-0 border-b-2 border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-base transition-colors group-focus-within:border-primary"
								defaultValue="Alex_Cipher"
							/>
						</div>

						<div className="flex flex-col gap-2 group">
							{/* biome-ignore lint/a11y/noLabelWithoutControl: hvhvh */}
							<label className="font-medium text-sm text-muted-foreground">
								Unique Link
							</label>
							<div className="relative flex items-center">
								<span className="absolute left-0 text-muted-foreground/60">
									whispr.me/
								</span>
								<Input
									className="bg-transparent border-0 border-b-2 border-border rounded-none pl-[84px] pr-10 focus-visible:ring-0 focus-visible:border-primary text-base transition-colors group-focus-within:border-primary w-full"
									defaultValue="alex-v402"
								/>
								<button
									type="button"
									className="absolute right-2 text-primary hover:text-primary/80 transition-colors"
								>
									<Copy className="w-5 h-5" />
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* Privacy Group */}
				<section className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
					<div className="flex items-center gap-3 mb-2">
						<Shield className="w-6 h-6 text-primary" />
						<h2 className="font-heading text-2xl font-bold text-foreground">
							Privacy
						</h2>
					</div>

					<div className="divide-y divide-border/50">
						<div className="flex items-center justify-between py-5 first:pt-0">
							<div className="max-w-[80%] pr-4">
								<p className="font-medium text-foreground mb-1">
									Terima gambar dari pengirim anonim
								</p>
								<p className="text-sm text-muted-foreground">
									Allow anonymous users to attach media files to their messages.
								</p>
							</div>
							<Switch
								checked={allowImages}
								onCheckedChange={setAllowImages}
								className="data-[state=checked]:bg-primary"
							/>
						</div>

						<div className="flex items-center justify-between py-5">
							<div className="max-w-[80%] pr-4">
								<p className="font-medium text-foreground mb-1">
									Filter otomatis kata kasar
								</p>
								<p className="text-sm text-muted-foreground">
									Automatically hide messages containing offensive language.
								</p>
							</div>
							<Switch
								checked={autoFilter}
								onCheckedChange={setAutoFilter}
								className="data-[state=checked]:bg-primary"
							/>
						</div>

						<div className="flex items-center justify-between py-5 last:pb-0">
							<div className="max-w-[80%] pr-4">
								<p className="font-medium text-foreground mb-1">
									Private Profile
								</p>
								<p className="text-sm text-muted-foreground">
									Hide your profile from public explore pages.
								</p>
							</div>
							<Switch
								checked={privateProfile}
								onCheckedChange={setPrivateProfile}
								className="data-[state=checked]:bg-primary"
							/>
						</div>
					</div>
				</section>

				{/* Action Buttons */}
				<div className="flex flex-col md:flex-row gap-4 pt-4">
					<Button
						className={`flex-1 py-6 text-lg font-bold rounded-xl transition-all ${
							isSaved
								? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
								: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(192,193,255,0.3)]"
						}`}
						onClick={handleSave}
						disabled={isSaving}
					>
						{isSaving ? (
							<>
								<Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...
							</>
						) : isSaved ? (
							<>
								<CheckCircle className="w-5 h-5 mr-2" /> Changes Saved
							</>
						) : (
							<>
								<Save className="w-5 h-5 mr-2" /> Save Changes
							</>
						)}
					</Button>
					<Button
						variant="outline"
						className="flex-1 py-6 text-lg font-bold rounded-xl glass-panel border-none text-muted-foreground hover:bg-white/5 hover:text-foreground"
					>
						Cancel
					</Button>
				</div>

				<div className="pt-12 text-center">
					<p className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-[0.2em]">
						End-to-End Encrypted Configuration
					</p>
				</div>
			</div>
		</div>
	);
}
