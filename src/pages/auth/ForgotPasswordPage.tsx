import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-white/20 p-8">
      <div className="mb-6 text-center">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Recuperar Contraseña</h2>
        <p className="text-sm text-gray-500 mt-1">
          Se enviará un enlace seguro de 30 min y código al celular registrado.
        </p>
      </div>

      {submitted ? (
        <div className="space-y-4 text-center">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            Si la cuenta existe en el padrón, hemos enviado las instrucciones a tus medios de
            contacto registrados. (Mensaje seguro anti-descubrimiento RF-AUT-05).
          </div>
          <Link to={ROUTES.LOGIN}>
            <Button variant="outline" className="w-full">
              Regresar al Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Correo o CURP/RFC"
            placeholder="Ingresa tu dato registrado"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Button type="submit" className="w-full">
            Enviar Instrucciones
          </Button>
          <div className="text-center pt-2">
            <Link
              to={ROUTES.LOGIN}
              className="text-xs text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Cancelar y volver
            </Link>
          </div>
        </form>
      )}
    </Card>
  );
}
