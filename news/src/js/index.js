import '../scss/index.scss'
import Header from '../components/header/header'
import Nav from '../components/nav/nav'
import { news_type } from "../util/data"
import { IndexModel } from '../models/index'
import NewsList from '../components/news_list/news_list'

const header = new Header(),
      nav = new Nav(),
      newsList =  new NewsList()

const indexModel = new IndexModel()

let field = 'top',
    pageNum = 10

const App = ($) => {
    const $app = $('#app'),
          $list = $app.children('.list')

    const init = () => {
        render().then(bindEvent)
    }

    const render = () => {
        return new Promise((resolve,reject) => {
            _headerRender()
            _navRender()
            _listRender()
            resolve()
        })
    }

    const bindEvent = () => {
        $('.scroll-wrapper').on('click','.item',selectNav)
    }

    const _headerRender = () => {
        $app.append(header.tpl({
            iconLeft:'none',
            title:"新闻头条",
            iconRight:'block'
        }))
        
    }

    const _navRender = () => {
        let tpls = nav.tpl(news_type)
        $app.append(tpls.navStr)
        $('.scroll-wrapper').append(tpls.itemStr)
    }

    const _listRender = () => {
        indexModel.getNewsList(field,pageNum).then(res => {
            res.forEach(item => {
                $list.append(newsList.tpl(item))
                console.log(res)
            });
            
        })
        
    }

    function selectNav () {
        const $this = $(this)
        // console.log($this)
        field = $this.attr('data-type')
        $this.addClass("current").siblings().removeClass('current')

    }


    init()
}

App(Zepto)