import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router';
import { PopularResponse, PopularItem } from './types';
import Pagination from '../components/pagination';

export async function getServerSideProps(context: NextPageContext) {
  const pageOptions = {
    pn: 1,
    ps: 21
  }

  if (context.query.page) {
    pageOptions.pn = Number(context.query.page)
  }

  const ua = context.req?.headers['user-agent'] || ''
  const data: PopularResponse  = await fetch(`https://api.bilibili.com/x/web-interface/popular?ps=${pageOptions.ps}&pn=${pageOptions.pn}`, { headers: { 'User-Agent': ua } }).then(data => data.json());
  return {
    props: {
      data: data.data.list,
      total: 500,
      pagination: pageOptions
    }
  }
}

interface IProps {
  data: PopularItem[]
  total: number
  pagination: {
    pn: number
    ps: number
  }
}

const Home: NextPage<IProps> = ({ data, total, pagination }) => {
  const router = useRouter()

  const handleChangePage = (newPage: number) => {
    router.push({ href: router.asPath, query: { page: newPage } })
  }

  return (
    <div className={'container'}>
      <div className={'grid grid-cols-3 gap-x-6 gap-y-8'}>
        {data.map(item => <div key={item.aid} className={'flex gap-3'}>
          <img 
            className='rounded-sm'
            src={item.pic + '@412w_232h_1c.jpg'} 
            width={206} 
            height={116} />
          <div className='flex flex-col justify-between'>
            <div className='line-clamp-2'>{item.title}</div>

            <div>
              <div>
                <small>Play: {item.stat.view}</small>
                <small className='ml-2'>Talk: {item.stat.danmaku}</small>
              </div>

              <div>
                <small className='mt-0.5'>by {item.owner.name}</small>
              </div>
            </div>
          </div>
        </div>)}
      </div>
      <Pagination 
        page={pagination.pn} 
        pageCount={total / pagination.ps} 
        onChange={handleChangePage}
        className='mt-10' />
    </div>
  )
}

export default Home
