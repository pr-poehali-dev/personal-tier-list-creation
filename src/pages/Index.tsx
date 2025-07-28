import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Character {
  id: string;
  name: string;
  description: string;
  rating: number;
  tier?: 'S' | 'A' | 'B' | 'C' | 'D';
  avatar: string;
}

const Index = () => {
  const [characters, setCharacters] = useState<Character[]>([
    { id: '1', name: 'Мису', description: '', rating: 3, avatar: '🎭' },
    { id: '2', name: 'Эвелина', description: '', rating: 3, avatar: '🌸' },
    { id: '3', name: 'Хапилина', description: '', rating: 3, avatar: '🎨' },
    { id: '4', name: ':)', description: '', rating: 3, avatar: '😊' },
    { id: '5', name: 'Ярослав', description: '', rating: 3, avatar: '⚡' },
    { id: '6', name: 'Полина', description: '', rating: 3, avatar: '🌟' },
    { id: '7', name: 'Шизоид', description: '', rating: 3, avatar: '🤯' },
    { id: '8', name: 'twelve', description: '', rating: 3, avatar: '🔢' },
    { id: '9', name: 'чт', description: '', rating: 3, avatar: '📅' },
    { id: '10', name: 'вобел', description: '', rating: 3, avatar: '🎪' },
    { id: '11', name: 'платун', description: '', rating: 3, avatar: '💰' },
    { id: '12', name: 'да я', description: '', rating: 3, avatar: '🙋' },
    { id: '13', name: 'Гартер', description: '', rating: 3, avatar: '🎯' },
    { id: '14', name: 'саман', description: '', rating: 3, avatar: '🏠' },
    { id: '15', name: 'хорек', description: '', rating: 3, avatar: '🐾' },
    { id: '16', name: 'miracle', description: '', rating: 3, avatar: '✨' },
    { id: '17', name: 'хапил', description: '', rating: 3, avatar: '🎨' },
    { id: '18', name: 'дамир', description: '', rating: 3, avatar: '🎵' },
    { id: '19', name: 'аринка', description: '', rating: 3, avatar: '🌺' },
    { id: '20', name: 'Дима', description: '', rating: 3, avatar: '🚀' },
    { id: '21', name: 'Ромка попка', description: '', rating: 3, avatar: '🎈' },
    { id: '22', name: 'павлен', description: '', rating: 3, avatar: '🦚' },
    { id: '23', name: 'дашан', description: '', rating: 3, avatar: '🌊' },
    { id: '24', name: 'эрик', description: '', rating: 3, avatar: '⚔️' },
    { id: '25', name: 'егор', description: '', rating: 3, avatar: '🏔️' },
    { id: '26', name: 'саша', description: '', rating: 3, avatar: '🎪' }
  ]);

  const [tiers, setTiers] = useState<Record<string, Character[]>>({
    S: [],
    A: [],
    B: [],
    C: [],
    D: []
  });

  const [draggedCharacter, setDraggedCharacter] = useState<Character | null>(null);

  const handleDragStart = (character: Character) => {
    setDraggedCharacter(character);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (tierName: string) => {
    if (!draggedCharacter) return;

    // Remove character from original tier or character list
    setTiers(prev => {
      const newTiers = { ...prev };
      Object.keys(newTiers).forEach(tier => {
        newTiers[tier] = newTiers[tier].filter(char => char.id !== draggedCharacter.id);
      });
      newTiers[tierName] = [...newTiers[tierName], { ...draggedCharacter, tier: tierName as any }];
      return newTiers;
    });

    setCharacters(prev => prev.filter(char => char.id !== draggedCharacter.id));
    setDraggedCharacter(null);
  };

  const handleRemoveFromTier = (characterId: string) => {
    let removedCharacter: Character | null = null;
    
    setTiers(prev => {
      const newTiers = { ...prev };
      Object.keys(newTiers).forEach(tier => {
        const charIndex = newTiers[tier].findIndex(char => char.id === characterId);
        if (charIndex !== -1) {
          removedCharacter = newTiers[tier][charIndex];
          newTiers[tier] = newTiers[tier].filter(char => char.id !== characterId);
        }
      });
      return newTiers;
    });

    if (removedCharacter) {
      setCharacters(prev => [...prev, { ...removedCharacter, tier: undefined }]);
    }
  };

  const getTierColor = (tier: string) => {
    const colors = {
      S: 'bg-red-500',
      A: 'bg-orange-500', 
      B: 'bg-yellow-500',
      C: 'bg-green-500',
      D: 'bg-blue-500'
    };
    return colors[tier as keyof typeof colors];
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Icon 
            key={star}
            name={star <= rating ? "Star" : "Star"}
            size={16}
            className={star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Тир лист персонажей
          </h1>
          <p className="text-gray-600">
            Перетащите персонажей в соответствующие тиры
          </p>
        </div>

        {/* Tier List */}
        <div className="mb-8 space-y-4">
          {['S', 'A', 'B', 'C', 'D'].map(tier => (
            <div key={tier} className="flex bg-white rounded-lg shadow-sm border">
              {/* Tier Label */}
              <div className={`${getTierColor(tier)} w-20 flex items-center justify-center rounded-l-lg`}>
                <span className="text-2xl font-bold text-white">{tier}</span>
              </div>
              
              {/* Drop Zone */}
              <div 
                className="flex-1 min-h-[100px] p-4 flex items-center gap-3 flex-wrap bg-gray-50 rounded-r-lg border-l"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(tier)}
              >
                {tiers[tier].length === 0 ? (
                  <div className="w-full text-center text-gray-400 py-8">
                    Перетащите персонажей сюда
                  </div>
                ) : (
                  tiers[tier].map(character => (
                    <Card 
                      key={character.id}
                      className="p-3 cursor-pointer hover:shadow-md transition-all duration-200 bg-white min-w-[200px] group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{character.avatar}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{character.name}</h3>
                          <p className="text-xs text-gray-600 mb-1">{character.description}</p>
                          {renderStars(character.rating)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromTier(character.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Character Pool */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Users" size={24} />
            Персонажи
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {characters.map(character => (
              <Card 
                key={character.id}
                className="p-4 cursor-grab hover:shadow-lg transition-all duration-200 animate-fade-in"
                draggable
                onDragStart={() => handleDragStart(character)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{character.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{character.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{character.description}</p>
                    {renderStars(character.rating)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>💡 Совет: перетащите персонажей в тиры для создания рейтинга</p>
        </div>
      </div>
    </div>
  );
};

export default Index;