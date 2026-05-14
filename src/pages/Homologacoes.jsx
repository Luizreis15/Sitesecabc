import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Calendar, MapPin, Download, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Homologacoes = () => {
  const { toast } = useToast();
  const [isDownloadingImg, setIsDownloadingImg] = useState(false);

  // Using the CDN URL directly to ensure accessibility.
  // This guarantees the file is available regardless of local file system state.
  const DOC_IMAGE_URL = "https://horizons-cdn.hostinger.com/fb42e468-e100-43d7-9488-9dfef375dd7f/5d6a78fcbbbb041194681bbc01f81d4b.png";

  const handleAgendar = () => {
    window.open("https://wa.me/5511953905032", "_blank", "noopener,noreferrer");
  };

  const handleDownloadImage = async () => {
    try {
      setIsDownloadingImg(true);
      console.log("Starting image download process...");
      
      // We fetch the blob to force a browser "Save As" behavior even for cross-origin resources.
      // This prevents the browser from simply opening the image in a new tab.
      const response = await fetch(DOC_IMAGE_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'documentos-homologacao-secabc.png'; 
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("Image downloaded successfully.");
      toast({
        title: "Download concluído!",
        description: "A lista de documentos foi salva no seu dispositivo.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
    } catch (error) {
      console.error("Download error:", error);
      
      // Fallback: If programmatic download fails (e.g. strict CORS), open in new tab
      // This ensures the user still gets access to the file no matter what.
      window.open(DOC_IMAGE_URL, '_blank');
      
      toast({
        title: "Arquivo aberto",
        description: "A imagem foi aberta em uma nova aba. Você pode salvá-la manualmente.",
        variant: "default", 
      });
    } finally {
      setIsDownloadingImg(false);
    }
  };

  // Updated documents list with 16 items as requested
  const documentos = [
    "5 vias - Termo de Rescisão de Contrato de Trabalho",
    "5 vias - Termo de Homologação de Contrato de Trabalho",
    "1 via - Carta de Preposição (para o sindicato)",
    "3 vias - Carta de Aviso Prévio ou Pedido de Demissão",
    "3 vias - Exame Demissional",
    "3 vias - Extrato FGTS",
    "3 vias - GFD - Guia do FGTS DIGITAL",
    "3 vias - Comprovante de pagamento da multa",
    "3 vias - Detalhe da guia emitida",
    "3 vias - Comprovante de Depósito Bancário ou PIX. Se for pagamento em cheque somente administrativo ou visado, pagar no ato da homologação. Em todos os casos, tirar cópia do cheque ou do comprovante.",
    "1 via - Para todas as homologações, apresentar último holerite",
    "1 via - Perfil Profissiográfico previdenciário (P.P.P) {quando a função for insalubre}",
    "1 via - Ficha de Registro",
    "- Guia de Requerimento do Seguro-Desemprego, com carimbo da empresa nas 2 vias",
    "2 vias - Vendedor Comissionista (VAREJO) – Apresentar demonstrativo de médias de comissão (4 últimos meses) ou holerite (4 últimos). Ou preferencialmente no verso da rescisão.",
    "2 vias - Vendedor Comissionista (CONCESSIONÁRIAS) - Apresentar demonstrativo de média de comissão (6 últimos meses) Ou preferencialmente no verso da rescisão."
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Homologações | SECABC</title>
        <meta name="description" content="Confira os documentos necessários para o processo de homologação de rescisão contractual no SECABC." />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-text mb-4">Homologações</h1>
          <p className="text-lg md:text-xl text-brand-ui text-gray-600">
            Documentos necessários para o processo de homologação de rescisão contratual
          </p>
        </div>

        {/* Identification Card */}
        <Card className="rounded-xl shadow-lg border-l-4 border-l-primary max-w-4xl mx-auto overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                <MapPin size={32} />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-bold text-primary tracking-wider uppercase">
                  TRAB. NO COM. SANTO ANDRÉ
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  SANTO ANDRÉ
                </h2>
                <h3 className="text-lg font-semibold text-gray-700">
                  SINDICATO DOS EMPREGADOS NO COMÉRCIO DE SANTO ANDRÉ
                </h3>
                <p className="text-gray-600 leading-relaxed pt-2">
                  <span className="font-semibold text-gray-800">Base Territorial:</span> Santo André, São Bernardo do Campo, São Caetano do Sul, Ribeirão Pires, Mauá, Diadema e Rio Grande da Serra
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <section className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-t-4 border-t-secondary">
            <CardHeader className="bg-gray-50 border-b pb-6">
              <CardTitle className="text-2xl font-heading text-brand-text flex items-center gap-3">
                <div className="bg-secondary text-white p-1.5 rounded-md">
                   <CheckCircle2 size={24} />
                </div>
                Relação de documentos para homologação
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-100">
                {documentos.map((doc, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm shrink-0 mt-0.5 border border-gray-200">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 font-medium leading-relaxed mt-1">
                      {doc}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Download Section */}
        <section className="max-w-4xl mx-auto">
          <Card className="bg-blue-50/50 border border-blue-100">
            <CardHeader>
              <CardTitle className="text-xl font-heading text-blue-900 flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-600" />
                Baixar Documento de Homologação
              </CardTitle>
              <CardDescription className="text-blue-800/70">
                Faça o download da lista de documentos necessários para impressão ou consulta offline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                className="w-full bg-white hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-900 shadow-sm"
                onClick={handleDownloadImage}
                disabled={isDownloadingImg}
              >
                {isDownloadingImg ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ImageIcon className="mr-2 h-4 w-4" />
                )}
                Baixar Documento (Imagem)
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Warning Block */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start shadow-sm">
            <div className="text-amber-600 bg-amber-100 p-3 rounded-full shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-800 mb-2">Atenção</h3>
              <p className="text-amber-900/80 leading-relaxed">
                Recomendamos que você consulte a cartilha do Ministério do Trabalho sobre a utilização da Carteira Digital de Trabalho e do aplicativo do FGTS para melhor compreensão dos procedimentos.
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Button 
            size="lg" 
            className="w-full sm:w-auto min-w-[200px] text-base font-semibold shadow-md hover:shadow-lg transition-all"
            onClick={handleAgendar}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Agendar Homologação
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default Homologacoes;