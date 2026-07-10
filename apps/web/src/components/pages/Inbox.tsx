import {
	AlertTriangle,
	Download,
	EyeOff,
	Globe,
	Image as ImageIcon,
	MoreVertical,
	PlusCircle,
	Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Inbox() {
	return (
		<div className="pt-20 md:pt-8 px-4 md:px-10 min-h-screen">
			{/* Mobile Top Bar */}
			<header className="md:hidden fixed top-0 left-0 w-full z-30 bg-background/30 backdrop-blur-xl border-b border-border flex justify-between items-center px-4 py-4">
				<div className="font-heading text-primary tracking-tight font-bold text-xl">
					Whispr
				</div>
				<div className="flex items-center gap-4">
					<button
						type="button"
						className="text-primary active:scale-95 transition-transform"
					>
						<PlusCircle className="w-6 h-6" />
					</button>
					<Avatar className="w-8 h-8 border border-white/10">
						<AvatarImage src="https://i.pravatar.cc/150?img=11" />
						<AvatarFallback>AW</AvatarFallback>
					</Avatar>
				</div>
			</header>

			<div className="max-w-[768px] mx-auto flex flex-col gap-8">
				<section className="flex flex-col gap-6">
					<div className="flex items-center justify-between">
						<h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground tracking-tight">
							Inbox{" "}
							<span className="text-primary/80 font-normal">(12 Baru)</span>
						</h1>
						<div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border">
							<div className="w-2 h-2 rounded-full bg-primary status-pulse"></div>
							<span className="text-xs font-semibold text-muted-foreground tracking-wide">
								Real-time Aktif
							</span>
						</div>
					</div>

					<div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
						<Button
							variant="default"
							className="rounded-full shadow-lg shadow-primary/20"
						>
							Semua
						</Button>
						<Button
							variant="outline"
							className="rounded-full bg-muted border-border text-muted-foreground hover:bg-white/5"
						>
							Belum dibaca
						</Button>
						<Button
							variant="outline"
							className="rounded-full bg-muted border-border text-muted-foreground hover:bg-white/5 flex gap-2"
						>
							<ImageIcon className="w-4 h-4" /> Ada gambar
						</Button>
					</div>
				</section>

				<section className="flex flex-col gap-4">
					{/* Card 1: New Message */}
					<div className="glass-panel rounded-2xl p-6 relative group transition-all hover:shadow-[0_0_20px_rgba(192,193,255,0.1)] hover:-translate-y-1">
						<div className="flex justify-between items-start mb-4">
							<div className="flex items-center gap-2">
								<div className="w-2.5 h-2.5 rounded-full bg-primary status-pulse"></div>
								<span className="text-xs font-semibold text-primary uppercase tracking-widest">
									Baru
								</span>
							</div>
							<span className="text-xs text-muted-foreground font-semibold">
								2 menit yang lalu
							</span>
						</div>
						<p className="font-sans text-foreground mb-6 leading-relaxed">
							Hai! Aku suka banget sama caramu handle projek kemarin.
							Kapan-kapan kita ngopi bareng yuk buat bahas kolaborasi
							selanjutnya? ✨
						</p>
						<div className="flex justify-between items-center">
							<Button
								variant="link"
								className="px-0 flex gap-2 text-primary hover:text-primary/80"
							>
								<Globe className="w-4 h-4" /> Balas secara publik
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="text-muted-foreground hover:text-foreground"
							>
								<MoreVertical className="w-5 h-5" />
							</Button>
						</div>
					</div>

					{/* Card 2: Moderated */}
					<div className="glass-panel rounded-2xl p-6 border-destructive/20 bg-destructive-foreground/5">
						<div className="flex justify-between items-start mb-4">
							<Badge
								variant="outline"
								className="bg-destructive/10 text-destructive border-destructive/20 gap-1 rounded-full"
							>
								<AlertTriangle className="w-3.5 h-3.5" /> Menunggu moderasi
							</Badge>
							<span className="text-xs text-muted-foreground font-semibold">
								15 menit yang lalu
							</span>
						</div>
						<div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-muted group">
							<img
								src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
								className="w-full h-full object-cover blur-2xl scale-110 opacity-50"
								alt="Blurred content"
							/>
							<div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center gap-3">
								<EyeOff className="w-10 h-10 text-destructive" />
								<p className="text-foreground text-center text-sm font-medium px-8">
									Gambar ini mengandung konten yang berpotensi sensitif.
								</p>
							</div>
						</div>
						<div className="flex flex-wrap items-center gap-3">
							<Button
								variant="outline"
								className="rounded-full bg-muted border-border hover:bg-white/5"
							>
								Lihat tetap
							</Button>
							<Button
								variant="outline"
								className="rounded-full bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive/20 hover:text-destructive"
							>
								Laporkan
							</Button>
						</div>
					</div>

					{/* Card 3: Normal */}
					<div className="glass-panel rounded-2xl p-6 opacity-80 hover:opacity-100 transition-all">
						<div className="flex justify-between items-start mb-4">
							<span className="text-xs text-muted-foreground font-semibold">
								Hari ini, 09:12
							</span>
						</div>
						<p className="font-sans text-foreground mb-6 leading-relaxed">
							Keren sih Whispr ini, bener-bener ngerasa secure pas ngirim pesan
							anonim. UX-nya juga smooth parah! 🔥
						</p>
						<div className="flex justify-between items-center">
							<Button
								variant="link"
								className="px-0 flex gap-2 text-primary hover:text-primary/80"
							>
								<Globe className="w-4 h-4" /> Balas secara publik
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="text-muted-foreground hover:text-foreground"
							>
								<MoreVertical className="w-5 h-5" />
							</Button>
						</div>
					</div>

					{/* Card 4: Image */}
					<div className="glass-panel rounded-2xl p-6">
						<div className="flex justify-between items-start mb-4">
							<span className="text-xs text-muted-foreground font-semibold">
								Kemarin, 21:45
							</span>
						</div>
						<p className="font-sans text-foreground mb-4 leading-relaxed">
							Check out this setup!
						</p>
						<div className="w-full aspect-square md:aspect-video rounded-xl overflow-hidden mb-6 border border-border">
							<img
								src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2942&auto=format&fit=crop"
								className="w-full h-full object-cover"
								alt="Setup"
							/>
						</div>
						<div className="flex justify-between items-center">
							<Button
								variant="link"
								className="px-0 flex gap-2 text-primary hover:text-primary/80"
							>
								<Globe className="w-4 h-4" /> Balas secara publik
							</Button>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="icon"
									className="text-muted-foreground hover:text-primary"
								>
									<Download className="w-5 h-5" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="text-muted-foreground hover:text-destructive"
								>
									<Trash2 className="w-5 h-5" />
								</Button>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
