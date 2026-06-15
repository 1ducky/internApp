'use client'

import { useState } from 'react';
import Map, { NavigationControl, Marker, Popup } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, } from 'lucide-react';

interface MarkerData {
    marker: {
        lat: number;
        long: number;
    };
    icon?: React.ReactNode
    popUp: string;
}

interface GeolocationMapProps {
    markers?: MarkerData[];
    initialCenter?: {
        lat: number;
        long: number;
    };
}

export default function GeolocationMap({
    markers = [],
    initialCenter = { lat: -7.293400998491009, long: 112.59542052082475 },
}: GeolocationMapProps) {
    const [viewState, setViewState] = useState({
        longitude: initialCenter.long,
        latitude: initialCenter.lat,
        zoom: 12,
        pitch: 45,
    });

    // Index marker yang sedang aktif (popup terbuka)
    const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null);

    return (
        <div className="relative aspect-video resize">
            <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                mapLib={maplibregl}
                mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
                onClick={() => setActivePopupIndex(null)}
            >
                <NavigationControl position="top-right" />

                {markers.map((item, index) => (
                    <Marker
                        key={index}
                        longitude={item.marker.long}
                        latitude={item.marker.lat}
                        anchor="bottom"
                        onClick={(e) => {
                            // Cegah event click sampai ke Map (yang menutup popup)
                            e.originalEvent.stopPropagation();
                            setActivePopupIndex(index === activePopupIndex ? null : index);
                        }}
                    >
                        {item.icon || <MapPin className="cursor-pointer text-red-500 w-6 h-6" />}
                    </Marker>
                ))}

                {activePopupIndex !== null && markers[activePopupIndex] && viewState.zoom < 20 && (
                    <Popup
                        longitude={markers[activePopupIndex].marker.long}
                        latitude={markers[activePopupIndex].marker.lat}
                        anchor="top"
                        onClose={() => setActivePopupIndex(null)}
                    >
                        <div style={{ padding: "5px", color: "#000" }}>
                            <p>{markers[activePopupIndex].popUp}</p>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}