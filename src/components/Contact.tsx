import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="container mx-auto py-20 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Contact</h2>
      <p className="mb-6 text-gray-300">
        Un projet, une question&nbsp;? Discutons-en&nbsp;!
      </p>
      <Button
        asChild
        className="px-8 py-4 text-lg rounded-2xl shadow-lg hover:scale-105 transition-transform"
      >
        <a href="mailto:e.b.seye@gmail.com">Écrivez-moi</a>
      </Button>
    </section>
  );
}
