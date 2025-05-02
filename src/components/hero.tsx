import { ArrowRight, Book, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';

export default function Hero() {
    return (
        <div className="bg-gradient-to-b from-background to-muted min-h-screen flex items-center">
            <div className="container px-4 py-16 md:py-24">
                <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-foreground">
                        {import.meta.env.VITE_PROJECT_NAME || "WikiFlow"}
                    </h1>
                    
                    <p className="text-xl text-muted-foreground">
                        Your collaborative knowledge hub where ideas take shape and information flourishes.
                        Create, explore, and share knowledge with our intuitive wiki platform.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button asChild variant="outline" size="lg" className="gap-2 ">
                            <Link className='' to="/pages">
                                Get Started <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>

                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
                        <Card>
                            <CardContent className="pt-6 flex flex-col items-center">
                                <Edit className="h-12 w-12 text-primary mb-4" />
                                <h3 className="font-semibold text-lg mb-2">Create & Edit</h3>
                                <p className="text-muted-foreground text-center">
                                    Easily author and update wiki content with our intuitive editor
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6 flex flex-col items-center">
                                <Book className="h-12 w-12 text-primary mb-4" />
                                <h3 className="font-semibold text-lg mb-2">Knowledge Base</h3>
                                <p className="text-muted-foreground text-center">
                                    Organize information into a structured, accessible knowledge base
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
