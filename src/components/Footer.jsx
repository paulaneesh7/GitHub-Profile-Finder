const Footer = () => {
    return (
        <section style={{position: "fixed", bottom: 0, width: "100%"}} class="-mt-px border-y border-gray-900 bg-slate-800 text-white">
            <div class="mx-auto max-w-screen-xl px-4 py-1.5">
                <a
                    href="https://github.com/paulaneesh7/GitHub-Profile-Finder"
                    rel="noreferrer"
                    target="_blank"
                    class="flex items-center justify-center gap-1.5 transition hover:opacity-75"
                >
                    <span class="text-sm/tight font-medium">
                        Want to fix anything? <span className="text-sky-400">Click here</span> and don't forget to ⭐ the repo!
                    </span>
                    {/* <span aria-hidden="true" role="img">
                        🎉
                    </span> */}
                </a>
            </div>
        </section>
    );
};

export default Footer;
