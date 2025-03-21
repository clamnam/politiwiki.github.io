import { Button } from "@/components/ui/button";
export default function Hero(){



    return (
        <div>
         

            <div className="container-fluid  text-white ">
                <div className=" grid h-screen place-items-center">
                <Button
                    variant="default"
                    size="lg"
                    className="text-white bg-neutral-800 hover:bg-red-500 focus:ring-red-900 shadow-md rounded-lg px-6 py-3 transition-colors"
                >
                    Get Started
                </Button>
                </div>

            </div>

        
        </div>
    );
};

