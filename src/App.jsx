import React, {useState, useMemo} from 'react'
import chaptersData from './data/chapters.json'
import { motion, AnimatePresence } from 'framer-motion'
import './styles.css'

export default function App(){
  const [index, setIndex] = useState(0)
  const [query, setQuery] = useState('')
  const chapters = useMemo(()=>{
    if(!query) return chaptersData
    const q = query.toLowerCase()
    return chaptersData.map(ch=>{
      const matched = ch.content.toLowerCase().includes(q) || ch.title.toLowerCase().includes(q)
      return {...ch, visible: matched}
    }).filter(c=>c.visible)
  },[query])
  const current = chapters[index] ?? chapters[0]

  React.useEffect(()=>{ if(index >= chapters.length) setIndex(0) },[chapters,index])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex items-center gap-4 bg-white/60 p-4 rounded-xl shadow-md">
        <div className="logo w-18 h-18 rounded-xl flex items-center justify-center text-white font-extrabold text-lg">ISPM</div>
        <div>
          <h1 className="text-lg font-semibold">INSTITUT SUPERIEURE POLYTECHNIQUE DE MADAGASCAR</h1>
          <p className="text-sm text-gray-500">Planting Bot — Mémoire de projet</p>
        </div>
      </header>

      <div className="mt-6 grid md:grid-cols-[260px_1fr] gap-6">
        <aside className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex gap-2">
            <input className="flex-1 p-2 rounded-lg border border-gray-100" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher..." />
            <button className="px-3 py-2 rounded-lg bg-white border" onClick={()=>{setQuery(''); setIndex(0)}}>Reset</button>
          </div>
          <nav className="mt-4 space-y-2" aria-label="Chapitres">
            {chapters.map((ch,i)=>(
              <div key={ch.id} onClick={()=>setIndex(i)} className={`p-3 rounded-lg cursor-pointer ${i===index? 'bg-[rgba(159,214,165,0.12)] border-l-4 border-ispmgreen':''}`}>
                <div className="font-medium">{ch.title}</div>
                <div className="text-xs text-gray-500">{ch.preview}</div>
              </div>
            ))}
          </nav>
        </aside>

        <main className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={()=>setIndex(i=>Math.max(0,i-1))} className="px-3 py-2 rounded-lg bg-ispmgreen text-white font-semibold">Précédent</button>
            <button onClick={()=>setIndex(i=>Math.min(chapters.length-1, i+1))} className="px-3 py-2 rounded-lg bg-ispmgreen text-white font-semibold">Suivant</button>
            <div className="ml-auto text-sm text-gray-500">{index+1} / {chapters.length}</div>
          </div>

          <div className="text-sm text-gray-500 mb-4">Auteurs: LAHAJANAHARY Aldino Ermel, ...</div>

          <AnimatePresence mode="wait">
            <motion.article key={current?.id} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}} transition={{duration:0.28}}>
              <h2 className="text-2xl font-semibold mb-2">{current?.title}</h2>
              <div className="prose max-w-none">
                {current?.content.split('\n\n').map((p,idx)=>(<p key={idx}>{p}</p>))}
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-6 text-center text-gray-500 text-sm">Version Tailwind + Framer Motion • Prêt pour GitHub</div>
        </main>
      </div>
    </div>
  )
}
