import { Header } from "./components/Header";
import { Post, PostProps } from "./components/Post";

import styles from './App.module.css'
import { Sidebar } from "./components/Sidebar";

interface PostsApiResponse extends PostProps {
  id: number
}

const posts: PostsApiResponse[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/xyluis.png',
      name: 'Luís',
      role: 'Full Stack Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' }
    ],
    publishedAt: new Date('2022-05-03 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/izakdvlpr.png',
      name: 'Zev',
      role: 'CEO @animeline'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: 'jane.design/doctorcare' }
    ],
    publishedAt: new Date('2022-05-05 08:12:00')
  }
]

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        
        <main>
          {posts.map(post => (
            <Post 
              key={post.id} 
              author={post.author} 
              content={post.content} 
              publishedAt={post.publishedAt} 
            />
          ))}
        </main>
      </div>
    </>
  )
}
