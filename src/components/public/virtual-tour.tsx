
export function VirtualTourViewer() {
    return (
        <div className="w-full h-full bg-black relative">
            <iframe
                width="100%"
                height="100%"
                // Sample Matterport tour for demo purposes
                src="https://my.matterport.com/show/?m=JGPnGQ6WjHK&play=1"
                frameBorder="0"
                allowFullScreen
                allow="xr-spatial-tracking"
                className="w-full h-full"
            ></iframe>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-semibold pointer-events-none">
                Muevete para explorar
            </div>
        </div>
    )
}
