import { Heart, HelpCircle, Share, Upload } from "lucide-react";
import { Button } from "#/components/ui/button";

export default function Profile() {
	return (
		<div className="pt-24 md:pt-16 pb-32 px-4 md:px-10 max-w-[1024px] mx-auto min-h-screen">
			{/* Profile Header */}
			<header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
				<div className="flex items-center gap-6">
					<div className="relative">
						<img
							src="https://i.pravatar.cc/150?img=47"
							className="w-24 h-24 rounded-full border-2 border-primary p-1 object-cover"
							alt="Alex Whispr"
						/>
						<div className="absolute bottom-1 right-1 w-5 h-5 bg-primary border-4 border-background rounded-full status-pulse"></div>
					</div>
					<div>
						<h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-1 tracking-tight">
							Alex Whispr
						</h1>
						<p className="text-muted-foreground">
							@alex_whispr • Asking questions is the first step to truth.
						</p>
					</div>
				</div>
				<div className="flex gap-3">
					<Button
						variant="outline"
						className="rounded-full bg-muted border-border hover:bg-white/5 flex gap-2"
					>
						<Share className="w-4 h-4" /> Share Profile
					</Button>
				</div>
			</header>

			{/* Stats Bento Grid */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
				<div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-32 glow-hover transition-all">
					<span className="text-muted-foreground font-medium text-sm">
						Total Replies
					</span>
					<span className="text-primary font-heading text-4xl font-bold tracking-tight">
						142
					</span>
				</div>
				<div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-32 glow-hover transition-all">
					<span className="text-muted-foreground font-medium text-sm">
						Top Liked
					</span>
					<span className="text-secondary font-heading text-4xl font-bold tracking-tight">
						853
					</span>
				</div>
				<div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-32 glow-hover transition-all bg-primary/10 border-primary/20">
					<span className="text-primary font-medium text-sm">
						Active Journey
					</span>
					<span className="text-primary font-heading text-4xl font-bold tracking-tight">
						12 Days
					</span>
				</div>
			</section>

			{/* Q&A Feed */}
			<div className="max-w-[768px] mx-auto flex flex-col gap-10">
				{/* Card 1 */}
				<article className="group animate-in fade-in slide-in-from-bottom-12 duration-1000 shadow-2xl">
					<div className="flex flex-col">
						<div className="bg-primary/10 border border-border rounded-t-3xl p-8 backdrop-blur-md relative overflow-hidden">
							<div className="absolute -top-4 -right-4 opacity-10">
								<HelpCircle className="w-32 h-32" />
							</div>
							<span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
								Anonymous Question
							</span>
							<h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight text-white relative z-10">
								What is the most difficult thing about maintaining complete
								anonymity in your work?
							</h2>
						</div>
						<div className="bg-background border-x border-b border-border rounded-b-3xl p-8">
							<div className="flex items-center gap-3 mb-4">
								<img
									src="https://i.pravatar.cc/150?img=47"
									className="w-8 h-8 rounded-full border border-primary/30"
									alt="Alex Whispr"
								/>
								<span className="font-medium text-sm text-primary">
									Alex's Whisper
								</span>
							</div>
							<p className="text-muted-foreground/90 text-lg leading-relaxed mb-6">
								The hardest part is the disconnection. Human beings are wired
								for recognition. To produce work that impacts thousands but
								never being able to say "I did that" requires a specific kind of
								ego-death. But the freedom it buys you is priceless.
							</p>
							<div className="flex items-center justify-between pt-6 border-t border-border/50">
								<span className="text-muted-foreground/60 text-xs font-medium">
									2 hours ago
								</span>
								<div className="flex gap-4">
									<button
										type="button"
										className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group/btn"
									>
										<Heart className="w-4 h-4 group-active/btn:scale-125 transition-transform" />
										<span className="text-xs font-semibold">24</span>
									</button>
									<button
										type="button"
										className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
									>
										<Upload className="w-4 h-4" />
										<span className="text-xs font-semibold">Share</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</article>

				{/* Card 2 */}
				<article className="group animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150 shadow-2xl">
					<div className="flex flex-col">
						<div className="bg-primary/10 border border-border rounded-t-3xl p-8 backdrop-blur-md relative overflow-hidden">
							<div className="absolute -top-4 -right-4 opacity-10">
								<HelpCircle className="w-32 h-32" />
							</div>
							<span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
								Anonymous Question
							</span>
							<h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight text-white relative z-10">
								Do you ever feel lonely in the Whispr sanctuary?
							</h2>
						</div>
						<div className="bg-background border-x border-b border-border rounded-b-3xl p-8">
							<div className="flex items-center gap-3 mb-4">
								<img
									src="https://i.pravatar.cc/150?img=47"
									className="w-8 h-8 rounded-full border border-primary/30"
									alt="Alex Whispr"
								/>
								<span className="font-medium text-sm text-primary">
									Alex's Whisper
								</span>
							</div>
							<p className="text-muted-foreground/90 text-lg leading-relaxed mb-6">
								Solitude is different from loneliness. Solitude is a choice to
								be with oneself. Loneliness is a lack of connection. Through
								these messages, I feel more connected to the raw, honest parts
								of humanity than I ever did in face-to-face small talk.
							</p>
							<div className="flex items-center justify-between pt-6 border-t border-border/50">
								<span className="text-muted-foreground/60 text-xs font-medium">
									Yesterday
								</span>
								<div className="flex gap-4">
									<button
										type="button"
										className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group/btn"
									>
										<Heart className="w-4 h-4 group-active/btn:scale-125 transition-transform" />
										<span className="text-xs font-semibold">118</span>
									</button>
									<button
										type="button"
										className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
									>
										<Upload className="w-4 h-4" />
										<span className="text-xs font-semibold">Share</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</article>
			</div>

			<div className="mt-16 text-center">
				<button
					type="button"
					className="glass-panel px-12 py-4 rounded-full text-primary font-medium hover:bg-primary/10 transition-all active:scale-95 glow-hover"
				>
					Decrypt More Memories
				</button>
			</div>
		</div>
	);
}
