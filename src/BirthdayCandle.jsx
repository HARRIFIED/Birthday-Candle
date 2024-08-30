import { useState, useEffect, useRef } from 'react';
import cake from './assets/cake.png'

const BirthdayCandle = () => {
    const [isLit, setIsLit] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);

            setIsListening(true);
            detectBlowing();
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    useEffect(() => {
        startListening()
    }, [])

    const detectBlowing = () => {
        if (!analyserRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const checkAudioInput = () => {
            analyserRef.current.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / bufferLength;

            if (average > 50) {
                setIsLit(false);
                stopListening();
            } else {
                requestAnimationFrame(checkAudioInput);
            }
        };

        checkAudioInput();
    };

    const stopListening = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        setIsListening(false);
    };

    const resetCandle = () => {
        setIsLit(true);
        stopListening();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 px-4">
            <div className="relative w-1/2 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8">
                <img
                    src={cake}
                    alt="Birthday Cake"
                    className=""
                />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <div className="w-2 sm:w-3 md:w-4 h-10 sm:h-16 md:h-20 bg-black rounded-t-full"></div>
                        {isLit && (
                            <div className="absolute -top-4 sm:-top-6 md:-top-8 left-1/2 transform -translate-x-1/2">
                                <div className="w-3 sm:w-4 md:w-6 h-5 sm:h-8 md:h-10 bg-yellow-500 rounded-full animate-flicker"></div>
                                <div className="w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-yellow-300 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">Happy Birthday xxxx!</h1>
            {/* {isLit ? (
                <button
                    onClick={startListening}
                    disabled={isListening}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                >
                    {isListening ? 'Listening...' : 'Blow out the candle!'}
                </button>
            ) : (
                <button
                    onClick={resetCandle}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Relight candle
                </button>
            )} */}
            <button
                onClick={() => alert("Blow your candle first")}

                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Collect your gift
            </button>
        </div>
    );
};

export default BirthdayCandle;