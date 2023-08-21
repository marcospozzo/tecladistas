"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.description}
    </main>
  )
}
