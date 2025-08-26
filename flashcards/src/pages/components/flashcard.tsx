"use client"

import { useState } from "react"
import { Card } from "./ui/card"

interface FlashcardProps {
  card: {
    id: number
    character: string
    pinyin: string
    translation: string
  }
}

export function FlashcardComponent({ card }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="flip-card w-full h-80" onClick={handleFlip}>
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Frente de la tarjeta */}
        <Card className="flip-card-front bg-card border-2 border-border cursor-pointer hover:shadow-xl transition-shadow duration-200">
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="text-8xl font-bold text-amber-600 mb-4">{card.character}</div>
            <div className="text-xl text-muted-foreground">Toca para ver la traducción</div>
          </div>
        </Card>

        {/* Reverso de la tarjeta */}
        <Card className="flip-card-back bg-secondary border-2 border-border cursor-pointer hover:shadow-xl transition-shadow duration-200">
          <div className="h-full flex flex-col items-center justify-center p-8 text-secondary-foreground">
            <div className="text-6xl font-bold mb-4 text-amber-600">{card.character}</div>
            <div className="text-2xl mb-4 font-medium text-amber-700">{card.pinyin}</div>
            <div className="text-xl text-center">{card.translation}</div>
            <div className="text-sm mt-4 opacity-75">Toca para volver</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
