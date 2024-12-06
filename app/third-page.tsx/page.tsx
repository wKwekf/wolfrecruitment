import Header from '../components/layout/Header'

export default function SecondPage() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Dritte Seite</h1>
        <p className="text-gray-600">
          Dies ist der Inhalt der dritten Seite. Hier können Sie weitere Informationen hinzufügen.
        </p>
      </div>
    </main>
  )
}