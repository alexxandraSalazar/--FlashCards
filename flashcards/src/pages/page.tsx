"use client"

import { useState } from "react"
import { Button } from "@/pages/components/ui/button"
import { Card } from "@/pages/components/ui/card"
import { Badge } from "@/pages/components/ui/badge"
import { Plus, RotateCcw, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { FlashcardComponent } from "./components/flashcard"
import { AddFlashcardDialog } from "./components/add-flashcard-dialog"

// Datos iniciales de HSK 1 y HSK 2
const initialDecks = {
  "HSK 1": [
    { id: 1, character: "我", pinyin: "wǒ", translation: "yo, me" },
    { id: 2, character: "你", pinyin: "nǐ", translation: "tú" },
    { id: 3, character: "他", pinyin: "tā", translation: "él" },
    { id: 4, character: "她", pinyin: "tā", translation: "ella" },
    { id: 5, character: "好", pinyin: "hǎo", translation: "bueno, bien" },
    { id: 6, character: "人", pinyin: "rén", translation: "persona" },
    { id: 7, character: "大", pinyin: "dà", translation: "grande" },
    { id: 8, character: "小", pinyin: "xiǎo", translation: "pequeño" },
    { id: 9, character: "水", pinyin: "shuǐ", translation: "agua" },
    { id: 10, character: "火", pinyin: "huǒ", translation: "fuego" },
  ],
  "HSK 2": [
    { id: 11, character: "学习", pinyin: "xuéxí", translation: "estudiar" },
    { id: 12, character: "工作", pinyin: "gōngzuò", translation: "trabajo" },
    { id: 13, character: "朋友", pinyin: "péngyǒu", translation: "amigo" },
    { id: 14, character: "时间", pinyin: "shíjiān", translation: "tiempo" },
    { id: 15, character: "地方", pinyin: "dìfāng", translation: "lugar" },
    { id: 16, character: "问题", pinyin: "wèntí", translation: "problema" },
    { id: 17, character: "开始", pinyin: "kāishǐ", translation: "comenzar" },
    { id: 18, character: "结束", pinyin: "jiéshù", translation: "terminar" },
    { id: 19, character: "帮助", pinyin: "bāngzhù", translation: "ayudar" },
    { id: 20, character: "希望", pinyin: "xīwàng", translation: "esperar" },
  ],
}

export default function FlashcardsApp() {
  const [decks, setDecks] = useState(initialDecks)
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const currentDeckCards = selectedDeck ? decks[selectedDeck as keyof typeof decks] : []

  const nextCard = () => {
    if (currentCardIndex < currentDeckCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  const resetDeck = () => {
    setCurrentCardIndex(0)
  }

  const addFlashcard = (deckName: string, flashcard: { character: string; pinyin: string; translation: string }) => {
    const newId =
      Math.max(
        ...Object.values(decks)
          .flat()
          .map((card) => card.id),
      ) + 1
    const newCard = { ...flashcard, id: newId }

    setDecks((prev) => ({
      ...prev,
      [deckName]: [...(prev[deckName as keyof typeof prev] || []), newCard],
    }))
  }

  if (selectedDeck) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => setSelectedDeck(null)} className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Volver
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">{selectedDeck}</h1>
              <p className="text-muted-foreground">
                {currentCardIndex + 1} de {currentDeckCards.length}
              </p>
            </div>
            <Button variant="outline" onClick={resetDeck} className="flex items-center gap-2 bg-transparent">
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </Button>
          </div>

          {/* Flashcard */}
          <div className="mb-8">
            <FlashcardComponent card={currentDeckCards[currentCardIndex]} />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevCard}
              disabled={currentCardIndex === 0}
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>

            <div className="flex gap-2">
              {currentDeckCards.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentCardIndex ? "bg-amber-600" : "bg-muted"}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextCard}
              disabled={currentCardIndex === currentDeckCards.length - 1}
              className="flex items-center gap-2 bg-transparent"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-amber-600" />
            <h1 className="text-4xl font-bold text-foreground">Flashcards HSK</h1>
          </div>
          <p className="text-lg text-muted-foreground">Aprende caracteres chinos de forma interactiva</p>
        </div>

        {/* Add Flashcard Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setShowAddDialog(true)}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Plus className="w-4 h-4" />
            Agregar Flashcard
          </Button>
        </div>

        {/* Decks Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(decks).map(([deckName, cards]) => (
            <Card
              key={deckName}
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => {
                setSelectedDeck(deckName)
                setCurrentCardIndex(0)
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-card-foreground">{deckName}</h2>
                <Badge variant="secondary" className="text-sm">
                  {cards.length} tarjetas
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">Practica caracteres del nivel {deckName}</p>

                {/* Preview de algunos caracteres */}
                <div className="flex gap-2 flex-wrap">
                  {cards.slice(0, 5).map((card) => (
                    <span key={card.id} className="text-2xl font-bold text-amber-600">
                      {card.character}
                    </span>
                  ))}
                  {cards.length > 5 && <span className="text-muted-foreground">...</span>}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Flashcard Dialog */}
        <AddFlashcardDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onAddFlashcard={addFlashcard}
          availableDecks={Object.keys(decks)}
        />
      </div>
    </div>
  )
}
