import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import logo from "../landing/images/logo.png";

export default function AuthPage() {
    return (
        <div className="flex flex-col min-h-screen bg-landing-bg bg-cover bg-center text-white">
            {/* Header */}
            
            <header className="bg-green-900 p-4 flex items-center justify-center shadow-lg">
                <Typography variant="h4" className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-40 h-40" /> <p className="font-extrabold text-5xl">DIRECTOR MANAGER</p>
                </Typography>
            </header>

            

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <Card className="bg-green-800 text-white shadow-xl p-6 w-full max-w-md">
                    <CardHeader title={<Typography variant="h5" className="text-center">Bienvenido a DIRECTOR MANAGER</Typography>} />
                    <CardContent className="flex flex-col gap-3 text-center">
                        <Typography variant="h6">Aquí podrás ser tu propio director técnico y llevar tu equipo a lo más alto</Typography>
                        <Typography variant="body2">¿Ya tenés una cuenta?</Typography>
                        <Button variant="contained" color="success" className="w-full" href="/signin">Iniciá sesión</Button>
                        <Button variant="contained" color="warning" className="w-full">Registrate</Button>
                    </CardContent>
                </Card>
            </main>

            {/* Footer */}
            <footer className="bg-green-700 p-4 text-center text-sm">
                <Typography variant="caption">© 2025 DIRECTOR MANAGER. Todos los derechos reservados.</Typography>
            </footer>
        </div>
    );
}
