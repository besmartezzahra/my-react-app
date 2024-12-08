import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MuchManyQuiz from './components/MuchManyQuiz';

function App() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">
              Much, Many & Too Much Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MuchManyQuiz />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
