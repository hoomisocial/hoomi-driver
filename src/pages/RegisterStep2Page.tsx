import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera, Upload, Info, CheckCircle2 } from "lucide-react";

interface DocumentType {
  id: string;
  title: string;
  subtitle: string;
  instructionTitle: string;
  instructionImage: "ektp" | "sim" | "stnk" | "skck";
  tips?: string[];
  uploaded: boolean;
  capturedImage: string | null;
}

type View = "list" | "instruction" | "capture" | "confirm";

const RegisterStep2Page = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<View>("list");
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<DocumentType[]>([
    {
      id: "ektp",
      title: "e-KTP",
      subtitle: "Identity card",
      instructionTitle: "ID Front",
      instructionImage: "ektp",
      tips: [
        "Image and text must be clear",
        "Take the photo in a well-lit place",
        "Do not use flash",
      ],
      uploaded: false,
      capturedImage: null,
    },
    {
      id: "sim",
      title: "SIM C",
      subtitle: "Driving License",
      instructionTitle: "Vehicle Registration",
      instructionImage: "sim",
      tips: [
        "Image and text must be clear",
        "Take the photo in a well-lit place",
        "Do not use flash",
      ],
      uploaded: false,
      capturedImage: null,
    },
    {
      id: "stnk",
      title: "STNK",
      subtitle: "Vehicle Registration",
      instructionTitle: "Vehicle Registration",
      instructionImage: "stnk",
      uploaded: false,
      capturedImage: null,
    },
    {
      id: "skck",
      title: "SKCK",
      subtitle: "Police Record",
      instructionTitle: "Police Record",
      instructionImage: "skck",
      uploaded: false,
      capturedImage: null,
    },
  ]);

  const activeDoc = documents.find((d) => d.id === activeDocId);
  const allUploaded = documents.every((d) => d.uploaded);

  const openDocument = (id: string) => {
    setActiveDocId(id);
    setCurrentView("instruction");
  };

  const handleTakePicture = () => {
    setCurrentView("capture");
  };

  const handleCapture = () => {
    // Simulate capturing a photo
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === activeDocId
          ? {
              ...d,
              capturedImage:
                "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop",
            }
          : d
      )
    );
    setCurrentView("confirm");
  };

  const handleConfirm = () => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === activeDocId ? { ...d, uploaded: true } : d
      )
    );
    setCurrentView("list");
    setActiveDocId(null);
  };

  const handleRetake = () => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === activeDocId ? { ...d, capturedImage: null } : d
      )
    );
    setCurrentView("capture");
  };

  const handleSubmit = () => {
    if (allUploaded) {
      localStorage.setItem(
        "hoomi_registration",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("hoomi_registration") || "{}"),
          step2Complete: true,
        })
      );
      navigate("/home");
    }
  };

  // Capture view (camera simulation)
  if (currentView === "capture") {
    return (
      <div className="min-h-screen max-w-[430px] mx-auto bg-[hsl(0,0%,35%)] flex flex-col relative">
        {/* Scanner frame */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Corner brackets */}
          <div className="absolute top-8 left-6 w-10 h-10 border-t-2 border-l-2 border-white/80 rounded-tl-lg" />
          <div className="absolute top-8 right-6 w-10 h-10 border-t-2 border-r-2 border-white/80 rounded-tr-lg" />
          <div className="absolute bottom-24 left-6 w-10 h-10 border-b-2 border-l-2 border-white/80 rounded-bl-lg" />
          <div className="absolute bottom-24 right-6 w-10 h-10 border-b-2 border-r-2 border-white/80 rounded-br-lg" />

          {/* Crosshair */}
          <div className="text-white/60 text-3xl">+</div>

          {/* Simulated viewfinder gradient */}
          <div className="absolute left-1/4 top-16 bottom-32 w-1/4 bg-gradient-to-r from-white/10 to-transparent rounded-lg" />
        </div>

        {/* Capture button */}
        <div className="pb-8 pt-4 flex justify-center bg-card">
          <button
            onClick={handleCapture}
            className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center shadow-lg border-4 border-white"
          >
            <Camera size={24} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    );
  }

  // Confirm view
  if (currentView === "confirm" && activeDoc) {
    return (
      <div className="min-h-screen flex flex-col max-w-[430px] mx-auto bg-card">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button
            onClick={handleRetake}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ChevronLeft size={22} className="text-foreground" />
          </button>
        </div>

        <div className="px-6">
          <h1 className="text-3xl font-extrabold text-foreground">
            {activeDoc.instructionTitle}
          </h1>
          <p className="text-muted-foreground mt-2">
            Make sure photos are clear and readable.
          </p>
        </div>

        {/* Captured image */}
        <div className="flex-1 flex items-center px-6 mt-8">
          <img
            src={activeDoc.capturedImage || ""}
            alt="Captured document"
            className="w-full rounded-2xl border border-border shadow-sm"
          />
        </div>

        {/* Buttons */}
        <div className="px-6 pb-8 space-y-3 mt-auto pt-6">
          <button
            onClick={handleConfirm}
            className="w-full gradient-purple text-primary-foreground font-bold text-lg py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            Confirm
          </button>
          <button
            onClick={handleRetake}
            className="w-full bg-secondary text-primary font-bold text-lg py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            Retake Picture
          </button>
        </div>
      </div>
    );
  }

  // Instruction view
  if (currentView === "instruction" && activeDoc) {
    return (
      <div className="min-h-screen flex flex-col max-w-[430px] mx-auto bg-card">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button
            onClick={() => {
              setCurrentView("list");
              setActiveDocId(null);
            }}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ChevronLeft size={22} className="text-foreground" />
          </button>
        </div>

        <div className="px-6">
          <h1 className="text-3xl font-extrabold text-foreground">
            {activeDoc.instructionTitle}
          </h1>
          <p className="text-muted-foreground mt-2">
            Make sure photos are clear and readable.
          </p>
        </div>

        {/* Document illustration */}
        <div className="px-6 mt-8 flex-1">
          {activeDoc.instructionImage === "ektp" && <EktpIllustration />}
          {activeDoc.instructionImage === "sim" && <SimIllustration />}
          {activeDoc.instructionImage === "stnk" && <StnkIllustration />}
          {activeDoc.instructionImage === "skck" && <StnkIllustration />}

          {/* Tips */}
          {activeDoc.tips && (
            <div className="mt-8 rounded-2xl border border-border p-5 space-y-3">
              {activeDoc.tips.map((tip, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-accent shrink-0"
                  />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </div>
              ))}
            </div>
          )}

          {/* Info for STNK */}
          {activeDoc.instructionImage === "stnk" && (
            <div className="mt-6 flex items-start gap-3">
              <Info size={18} className="text-primary mt-0.5 shrink-0" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Show the entry document including license plate number clearly
                visible.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="px-6 pb-8 pt-4">
          <button
            onClick={handleTakePicture}
            className="w-full gradient-purple text-primary-foreground font-bold text-lg py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            Take Picture
          </button>
        </div>
      </div>
    );
  }

  // Document list view (default)
  return (
    <div className="min-h-screen flex flex-col max-w-[430px] mx-auto bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button
          onClick={() => navigate("/register/step-1")}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
        >
          <ChevronLeft size={22} className="text-foreground" />
        </button>
      </div>

      <div className="px-6">
        <h1 className="text-3xl font-extrabold text-foreground">
          Upload Documents
        </h1>
        <p className="text-muted-foreground mt-2">
          Make sure photos are clear and readable.
        </p>
      </div>

      {/* Document list */}
      <div className="flex-1 px-6 mt-8 space-y-4">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => !doc.uploaded && openDocument(doc.id)}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
              doc.uploaded
                ? "border-primary/20 bg-secondary/30"
                : "border-border bg-card"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center shrink-0">
              {doc.uploaded ? (
                <CheckCircle2 size={24} className="text-primary" />
              ) : (
                <Camera size={22} className="text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-foreground">{doc.title}</p>
              <p className="text-sm text-muted-foreground">{doc.subtitle}</p>
            </div>
            {!doc.uploaded && (
              <Upload size={20} className="text-foreground shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Submit */}
      <div className="px-6 pb-8 pt-4">
        <button
          onClick={handleSubmit}
          disabled={!allUploaded}
          className={`w-full font-bold text-lg py-4 rounded-2xl transition-all ${
            allUploaded
              ? "gradient-purple text-primary-foreground active:scale-[0.98]"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Submit Application
        </button>
      </div>
    </div>
  );
};

// Illustration components
const EktpIllustration = () => (
  <div className="rounded-2xl overflow-hidden bg-[hsl(200,60%,92%)] p-5 relative">
    <div className="text-center mb-2">
      <p className="text-xs font-semibold text-[hsl(200,30%,35%)]">
        LOREM IPSUM DOLOR SIT AMET
      </p>
      <p className="text-xs text-[hsl(200,30%,35%)]">DOLOR SIT AMET</p>
    </div>
    <div className="flex gap-4">
      <div className="flex-1 space-y-1">
        <p className="text-xs font-bold text-[hsl(200,30%,25%)]">
          NIK : 1234567891287398238
        </p>
        <p className="text-[10px] text-[hsl(200,30%,35%)]">
          Nama : JOHN DOE
        </p>
        <p className="text-[10px] text-[hsl(200,30%,35%)]">
          Tempat/Tgl Lahir : LOREM, 25-10-1990
        </p>
        <p className="text-[10px] text-[hsl(200,30%,35%)]">
          Jenis Kelamin : LOREM
        </p>
        <p className="text-[10px] text-[hsl(200,30%,35%)]">
          Alamat : JL. IPSUM NO 11
        </p>
        <p className="text-[10px] text-[hsl(200,30%,35%)] ml-4">
          RT/RW : 001/002
        </p>
        <p className="text-[10px] text-[hsl(200,30%,35%)] ml-4">
          Kel/Desa : DOLOR
        </p>
      </div>
      <div className="w-16 h-20 rounded-lg bg-[hsl(0,70%,60%)] flex items-center justify-center">
        <span className="text-white text-[10px]">📷</span>
      </div>
    </div>
  </div>
);

const SimIllustration = () => (
  <div className="rounded-2xl overflow-hidden">
    <div className="bg-[hsl(0,75%,50%)] p-3 flex items-center justify-between">
      <div>
        <p className="text-white font-bold text-sm">INDONESIA</p>
        <p className="text-[hsl(45,90%,55%)] text-[10px] font-semibold">
          SURAT IZIN MENGEMUDI
        </p>
      </div>
      <div className="text-right">
        <p className="text-white text-[10px]">DRIVING LICENSE</p>
        <p className="text-white text-2xl font-bold">C</p>
      </div>
    </div>
    <div className="bg-[hsl(0,0%,90%)] p-4 flex gap-3">
      <div className="w-14 h-16 rounded-lg bg-[hsl(265,40%,85%)] flex items-center justify-center">
        <span className="text-[10px]">📷</span>
      </div>
      <div className="flex-1 space-y-0.5 text-[10px] text-[hsl(0,0%,30%)]">
        <p>1. NAMA LENGKAP</p>
        <p>2. TEMPAT, TANGGAL LAHIR</p>
        <p>3. GOLONGAN DARAH - PRIA</p>
        <p>4. JL. LOREM IPSUM NO. 123</p>
        <p className="ml-3">KEC. DOLOR SIT AMET</p>
      </div>
    </div>
  </div>
);

const StnkIllustration = () => (
  <div className="rounded-2xl overflow-hidden bg-[hsl(180,30%,92%)] p-5">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs font-semibold text-[hsl(180,20%,30%)]">
        SURAT TANDA NOMOR KENDARAAN
      </p>
      <span className="text-[10px] font-bold bg-[hsl(180,20%,85%)] px-2 py-0.5 rounded">
        STNK
      </span>
    </div>
    <div className="space-y-1">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-2.5 rounded bg-[hsl(180,25%,80%)]"
          style={{ width: `${70 - i * 10}%` }}
        />
      ))}
    </div>
    <div className="mt-3 flex gap-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-2 flex-1 rounded bg-[hsl(180,25%,80%)]"
        />
      ))}
    </div>
  </div>
);

export default RegisterStep2Page;
