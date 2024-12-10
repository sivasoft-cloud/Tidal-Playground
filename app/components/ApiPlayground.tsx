'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const API_BASE = "https://tidal.401658.xyz"

export function ApiPlayground() {
  const [endpoint, setEndpoint] = useState('/search')
  const [params, setParams] = useState({ s: '', type: 's', quality: 'HI_RES' })
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleParamChange = (key: string, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams(params).toString()
      const res = await fetch(`${API_BASE}${endpoint}/?${queryParams}`)
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({ error: 'An error occurred while fetching data' }, null, 2))
    }
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Request</CardTitle>
        <CardDescription>Test different endpoints of the Tidal API</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="search" onValueChange={(value) => setEndpoint(`/${value}`)}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="track">Track</TabsTrigger>
            <TabsTrigger value="album">Album</TabsTrigger>
            <TabsTrigger value="cover">Cover</TabsTrigger>
            <TabsTrigger value="song">Song</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search-query">Search Query</Label>
                  <Input
                    id="search-query"
                    value={params.s}
                    onChange={(e) => handleParamChange('s', e.target.value)}
                    placeholder="Enter search query"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search-type">Search Type</Label>
                  <Select value={params.type} onValueChange={(value) => handleParamChange('type', value)}>
                    <SelectTrigger id="search-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s">Song</SelectItem>
                      <SelectItem value="a">Artist</SelectItem>
                      <SelectItem value="al">Album</SelectItem>
                      <SelectItem value="v">Video</SelectItem>
                      <SelectItem value="p">Playlist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Send Request'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="track">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="track-id">Track ID</Label>
                  <Input
                    id="track-id"
                    value={params.id}
                    onChange={(e) => handleParamChange('id', e.target.value)}
                    placeholder="Enter track ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="track-quality">Quality</Label>
                  <Select value={params.quality} onValueChange={(value) => handleParamChange('quality', value)}>
                    <SelectTrigger id="track-quality">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HI_RES">Hi-Res</SelectItem>
                      <SelectItem value="LOSSLESS">Lossless</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Send Request'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="album">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="album-id">Album ID</Label>
                <Input
                  id="album-id"
                  value={params.id}
                  onChange={(e) => handleParamChange('id', e.target.value)}
                  placeholder="Enter album ID"
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Send Request'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="cover">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cover-id">Cover ID</Label>
                  <Input
                    id="cover-id"
                    value={params.id}
                    onChange={(e) => handleParamChange('id', e.target.value)}
                    placeholder="Enter cover ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover-query">Cover Query</Label>
                  <Input
                    id="cover-query"
                    value={params.q}
                    onChange={(e) => handleParamChange('q', e.target.value)}
                    placeholder="Enter cover query"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Send Request'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="song">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="song-query">Song Query</Label>
                  <Input
                    id="song-query"
                    value={params.q}
                    onChange={(e) => handleParamChange('q', e.target.value)}
                    placeholder="Enter song query"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="song-quality">Quality</Label>
                  <Select value={params.quality} onValueChange={(value) => handleParamChange('quality', value)}>
                    <SelectTrigger id="song-quality">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HI_RES">Hi-Res</SelectItem>
                      <SelectItem value="LOSSLESS">Lossless</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Send Request'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <h3 className="text-lg font-semibold mb-2">API Response:</h3>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto w-full">
          <code>{response}</code>
        </pre>
      </CardFooter>
    </Card>
  )
}

