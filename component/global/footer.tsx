export default function FooterComponent() {
    return (
        <>
            <footer className="bg-black text-white py-16 px-8 md:px-16 font-sans">
                <div className="max-w-7xl mx-auto">


                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">

                        <div>
                            <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-gray-300">Halaman</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Beranda</a></li>
                                <li><a href="#" className="hover:text-white transition">Berita</a></li>
                                <li><a href="#" className="hover:text-white transition">Produk</a></li>
                                <li><a href="#" className="hover:text-white transition">Event</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-gray-300">Butuh Bantuan?</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Hubungi Kami</a></li>
                                <li><a href="#" className="hover:text-white transition">Pusat Bantuan</a></li>
                                <li><a href="#" className="hover:text-white transition">Karir</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-gray-300">Tentang Aplikasi</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Tentang</a></li>
                                <li><a href="#" className="hover:text-white transition">Karir</a></li>
                                <li><a href="#" className="hover:text-white transition">Ketentuan Penggunaan</a></li>
                                <li><a href="#" className="hover:text-white transition">Notifikasi Legal</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-gray-300">Media Sosial</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                                <li><a href="#" className="hover:text-white transition">TikTok</a></li>
                                <li><a href="#" className="hover:text-white transition">X</a></li>
                                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                            </ul>
                        </div>

                        <div className="flex justify-start md:justify-end space-x-6 text-xl">
                            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Pinterest">
                                <i className="fab fa-pinterest-p"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    <hr className="border-gray-800 my-8" />

                    <div className="flex flex-col items-center justify-center text-center mt-12 space-y-6">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-serif tracking-widest uppercase font-medium">
                                InternApp
                            </span>
                            <span className="text-sm italic font-serif text-gray-400 tracking-widest mt-1">
                                est. 2026
                            </span>
                        </div>

                        <div className="text-xs text-gray-500 tracking-wide pt-4">
                            &copy; 2026 InternApp. Own By <a href="#" className="hover:underline text-gray-400">SMK Sunan Giri Menganti Gresik</a>. All rights reserved.
                        </div>
                    </div>

                </div>
            </footer>

        </>
    )
}