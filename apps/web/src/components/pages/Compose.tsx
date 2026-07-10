import { Camera, Loader2, Lock, Send, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Compose() {
	const [message, setMessage] = useState("");
	const [image, setImage] = useState<string | null>(null);
	const [isSending, setIsSending] = useState(false);

	const handleFile = (file: File) => {
		if (file?.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setImage(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		if (e.dataTransfer.files.length > 0) {
			handleFile(e.dataTransfer.files[0]);
		}
	};

	const handleSend = () => {
		if (!message.trim()) return;

		setIsSending(true);
		setTimeout(() => {
			setMessage("");
			setImage(null);
			setIsSending(false);
			toast.success("Pesan terkirim secara anonim", {
				className:
					"bg-background border-primary/50 text-foreground rounded-full px-6",
			});
		}, 1500);
	};

	return (
		<div className="flex flex-col items-center justify-start min-h-screen pt-12 pb-24 px-4 md:px-10 animate-in fade-in duration-500">
			{/* Profile Header */}
			<header className="flex flex-col items-center text-center mb-12">
				<div className="relative mb-6">
					<div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-primary to-secondary">
						<img
							src="https://i.pravatar.cc/150?img=47"
							className="w-full h-full rounded-full object-cover border-4 border-background"
							alt="Alex Doe"
						/>
					</div>
					<div className="absolute bottom-1 right-1 w-5 h-5 bg-primary border-4 border-background rounded-full status-pulse"></div>
				</div>
				<h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
					Alex Doe
				</h1>
				<p className="text-muted-foreground max-w-sm">
					Tanya apa saja, saya akan jawab di Story!
				</p>
			</header>

			{/* Composer */}
			<section className="w-full max-w-[768px]">
				<div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col gap-6">
					{/* Text Area */}
					<div className="relative">
						<Textarea
							className="min-h-[200px] bg-white/5 border-white/10 rounded-xl p-5 text-base resize-none focus-visible:ring-primary/50 focus-visible:border-primary/50"
							placeholder="Tulis pesan rahasiamu di sini..."
							maxLength={500}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<div className="absolute bottom-4 right-4 text-xs font-semibold text-muted-foreground">
							<span className={message.length >= 500 ? "text-destructive" : ""}>
								{message.length}
							</span>
							/500
						</div>
					</div>

					{/* Image Upload Zone */}
					{!image ? (
						<label
							className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/50 transition-all cursor-pointer group"
							onDragOver={(e) => e.preventDefault()}
							onDrop={handleDrop}
						>
							<input
								type="file"
								className="hidden"
								accept="image/*"
								onChange={(e) =>
									e.target.files && handleFile(e.target.files[0])
								}
							/>
							<div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
								<Camera className="w-6 h-6" />
							</div>
							<div className="text-center">
								<p className="text-foreground font-medium text-sm mb-1">
									Tambah Foto (Opsional)
								</p>
								<p className="text-muted-foreground text-xs">
									Drag & drop atau klik untuk upload
								</p>
							</div>
						</label>
					) : (
						<div className="relative w-full aspect-video md:aspect-[21/9] bg-muted rounded-xl overflow-hidden border border-primary/30">
							<img
								src={image}
								className="w-full h-full object-cover"
								alt="Preview"
							/>
							<Button
								variant="destructive"
								size="icon"
								className="absolute top-2 right-2 rounded-full w-8 h-8"
								onClick={() => setImage(null)}
							>
								<X className="w-4 h-4" />
							</Button>
						</div>
					)}

					{/* Action Section */}
					<div className="flex flex-col gap-4 mt-2">
						<Button
							className="w-full py-6 text-lg rounded-xl flex gap-2 group shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_20px_rgba(192,193,255,0.4)] transition-all"
							onClick={handleSend}
							disabled={isSending || !message.trim()}
						>
							{isSending ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Mengirim...
								</>
							) : (
								<>
									Kirim secara Anonim
									<Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
								</>
							)}
						</Button>
						<div className="flex items-center justify-center gap-2 text-muted-foreground/60">
							<Lock className="w-3.5 h-3.5" />
							<span className="text-xs font-medium">
								Pesanmu dienkripsi dan 100% anonim.
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="mt-16 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
				<p className="text-xs font-semibold text-muted-foreground mb-1">
					Powered by
				</p>
				<div className="font-heading text-primary font-bold text-2xl tracking-tight">
					Whispr
				</div>
			</footer>
		</div>
	);
}
