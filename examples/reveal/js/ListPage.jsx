import React from 'react';
import { Link } from 'react-router';
import randomColor from 'randomcolor';
import Item from './Item.jsx';
import action from './action.js';
import AppJS from '!!prismjs-loader?lang=jsx!./App';
import actionJS from '!!prismjs-loader?lang=jsx!./action';
import HomeJS from '!!prismjs-loader?lang=jsx!./Home';
import ListPageJS from '!!prismjs-loader?lang=jsx!./ListPage';
import ItemDetailPageJS from '!!prismjs-loader?lang=jsx!./ItemDetailPage';
import MainCSS from '!!prismjs-loader?lang=css!../less/main.less';

const codeFiles = [
  {name: 'App', code: AppJS},
  {name: 'Home', code: HomeJS},
  {name: 'ListPage', code: ListPageJS},
  {name: 'action', code: actionJS},
  {name: 'ItemDetailPage', code: ItemDetailPageJS},
  {name: 'css', code: MainCSS}
];

export default class ListPage extends React.Component {
  constructor(props) {
    super(props);

    const items = [];
    for (let i = 1; i < 15; i++) {
      items.push({
        id: i,
        text: `Item ${i}`,
        color: randomColor(),
      });
    }

    this.state = {
      items,
    };
  }

  render() {
    return (
      <div className="transition-item">
        <a href="../">Back to index page</a>
        <div className="list-page">
          {this.state.items.map(item => (
            <Link
              key={item.id}
              className="list-item"
              onClick={e =>
                action.onNext({
                  name: 'CLICKED_ITEM_DATA',
                  data: {
                    position: e.target.getBoundingClientRect(),
                    color: item.color,
                  },
                })
              }
              to={`/detail/${item.id}`}
            >
              <Item {...item} />
            </Link>
          ))}
        </div>
        <div className="transition-code">
          <h2>Code for this transition</h2>
          {codeFiles.map((item, i) => (
            <div key={i}>
              <h2>{item.name}</h2>
              <pre
                className="language-javascript"
                dangerouslySetInnerHTML={{ __html: item.code}}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
