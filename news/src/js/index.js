import '../scss/index.scss'
import Header from '../components/header/header'
import Nav from '../components/nav/nav'
import { news_type } from "../util/data"

const header = new Header()
const nav  = new Nav()

const App = ($) => {
    const $app = $('#app')
    const init = () => {
        render()
    }

    const render = () => {
        _headerRender()
        _navRender()
    }

    const bindEvent = () => {
        
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

    init()
}

App(Zepto)