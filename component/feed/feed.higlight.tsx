import { X } from "lucide-react"
import Image from "next/image"

export const FeedHighLight = ({ onCloseAction, src }: { onCloseAction: (val: string | undefined) => void, src: string }) => {
    return (
        <>
            <div
                onClick={() => onCloseAction(undefined)}
                className="fixed inset-0 w-screen h-screen z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
            >
                {/* Close button indicator */}
                <button
                    onClick={() => onCloseAction(undefined)}
                    className="absolute top-4 right-4 p-2.5 bg-white/10 text-white rounded-full hover:bg-white/20 transition hover:rotate-90 duration-300 cursor-pointer animate-fade-in"
                >
                    <X size={24} />
                </button>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full h-full max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 scale-100"
                >
                    <Image
                        src={src}
                        alt="Lampiran media resolusi penuh"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/85 to-transparent p-4 text-center">
                        <span className="text-white/80 text-xs font-medium">Klik di mana saja pada layar gelap untuk menutup tampilan penuh</span>
                    </div>
                </div>
            </div>

        </>
    )
}