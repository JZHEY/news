import '../scss/collections.scss'
import Header from '../components/header/header'

const header = new Header()

const App = ($) => {
    const $app = $('#app')
    const init = () => {
        render()
    }

    const render = () => {
        _headerRender()
    }

    const _headerRender = () => {
        $app.append(header.tpl({
            iconLeft:'block',
            title:"收藏列表",
            iconRight:'none'
        }))
        
    }

    init()
}

App(Zepto)