import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Container from 'react-bootstrap/Container';
import ASSETS, { IAsset } from './assets'

import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import StorageMemo from './StorageMemo';

const SEARCH_API_KEY = process.env.REACT_APP_SEARCH_API_KEY;
const SEARCH_ENGINE_ID = process.env.REACT_APP_SEARCH_ENGINE_ID;

/*
"items": [
     {
      "kind": "customsearch#result",
      "title": "Creature Feature: Red Fox | Natural Resources Council of Maine",
      "htmlTitle": "Creature Feature: Red \u003cb\u003eFox\u003c/b\u003e | Natural Resources Council of Maine",
      "link": "https://www.nrcm.org/wp-content/uploads/2018/12/Red-fox-winter-South-China-4-Hal-Winters.jpg",
      "displayLink": "www.nrcm.org",
      "snippet": "Creature Feature: Red Fox | Natural Resources Council of Maine",
      "htmlSnippet": "Creature Feature: Red \u003cb\u003eFox\u003c/b\u003e | Natural Resources Council of Maine",
      "mime": "image/jpeg",
      "image": {
       "contextLink": "https://www.nrcm.org/nrcm-creature-feature/red-fox/",
       "height": 922,
       "width": 1400,
       "byteSize": 410035,
       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Cuq6jx5aXKhiyZMseS1dOKGOUSsHuakJina8xdvpvUZHnAc7_AtuFN8",
       "thumbnailHeight": 99,
       "thumbnailWidth": 150
      }
     },
*/

function indexKey(word: string) {
  return ['asset', word, 'index'].join('/');
}

function getIndex(word: string) {
  return Number(localStorage.getItem(indexKey(word)) || '0');
}
function setIndex(word: string, index: number) {
  localStorage.setItem(indexKey(word), index.toString())
}

async function fetchJson(urlString: string) {
  const queryResult = await fetch(urlString);
  console.log({ queryResult });
  const result = await queryResult.json();
  console.log({ result });
  return result;
}

    
function PlayingCard(props: { word: string, assets: IAsset[], index?: number }) {
  const { word, assets } = props;
  if (!word || !assets) {
    throw new Error(`missing props: ${JSON.stringify(props)}`);
  }
  let index = getIndex(word);
  if (index >= assets.length) {
    index = 0;
  }
  const asset = assets[index];
  return (<Col className='p-1' xs={4} key={word} onClick={() => setIndex(word, index++)}>
    <div className='playing-card'>
      <div className='img-box' style={{
        backgroundImage: `url(${asset.asset})`,
      }}>
        {/* <Image 
    // roundedCircle={asset.bleed} 
    src={asset.asset}/> */}
      </div>
      <div className="word">
        {word.split('').map((c, i) =>
          <div key={i} className="letter">
            {c}
          </div>
        )}
      </div>
    </div>
  </Col>);
}

interface ICell {
  word: string;
  asset: IAsset;
}

interface ISearchResult {
  kind: string; //"customsearch#result";
  title: string;//"Creature Feature: Red Fox | Natural Resources Council of Maine";
  htmlTitle: string; //"Creature Feature: Red \u003cb\u003eFox\u003c/b\u003e | Natural Resources Council of Maine";
  link: string; //"https://www.nrcm.org/wp-content/uploads/2018/12/Red-fox-winter-South-China-4-Hal-Winters.jpg";
  displayLink: string; //"www.nrcm.org";
  snippet: string; //"Creature Feature: Red Fox | Natural Resources Council of Maine";
  htmlSnippet: string; //"Creature Feature: Red \u003cb\u003eFox\u003c/b\u003e | Natural Resources Council of Maine";
  mime: string; // "image/jpeg";
  image?: {
    contextLink: string; //"https://www.nrcm.org/nrcm-creature-feature/red-fox/";
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string; //"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Cuq6jx5aXKhiyZMseS1dOKGOUSsHuakJina8xdvpvUZHnAc7_AtuFN8";
    thumbnailHeight: number;
    thumbnailWidth: number;
  }
}

interface ISearchResults {
  "queries": {
    "request": Array<{
      "title": string;
      "totalResults": number;
      searchTerms: string;
    }>
  };
  "items": ISearchResult[];
}

const GOOGLE_URL = 'https://www.googleapis.com/customsearch/v1';

interface IState {
  q?: string;
  showResults?: boolean;
  result?: ISearchResults;
  error?: Error;
  cells: ICell[];
}

class App extends React.Component<{}, IState> {
  private fetchMemo = new StorageMemo(localStorage, "fetchJson", fetchJson);

  constructor(props: any) {
    super(props);
    this.state = {
      cells: [
        { asset: ASSETS.baseballBat, word: "bat" },
        { asset: ASSETS.bee, word: "bee" },
        { asset: ASSETS.bed, word: "bed" },
      ]
    };
  }

  public render = () => {
    const resultAssets: IAsset[] = [];
    if (this.state.result) {
      this.state.result.items.forEach((result) => {
        if (result.image === undefined) {
          return false;
        }
        const asset: IAsset = {
          asset: result.image.thumbnailLink,
          bleed: true,
          license: "Google Image Search",
          src: result.image.contextLink,
        };
        resultAssets.push(asset);
      });
    }
    return <Container>
      <Card>
        <Card.Body>
          <Form onSubmitCapture={this.add}>
            <Form.Group>
              <Form.Label>Keyword</Form.Label>
              <Form.Control type="text" placeholder="Single keyword" value={this.state.q}
                onChange={(e: any) => {
                  this.setState({ q: e.target.value });
                }} />
              {/* <Form.Text className="text-muted">                
              </Form.Text> */}
            </Form.Group>
            <Button variant="primary" onClick={this.add}>Add</Button>
          </Form>
        </Card.Body>
        {this.state.error &&
          <Card.Body>
            <Alert variant="warning"><Alert.Heading>{this.state.error.name}</Alert.Heading>{this.state.error.message}</Alert>
          </Card.Body>}
        <Card.Body>
          <Row>
            {this.state.cells.map((cell) => <PlayingCard
              word={cell.word}
              assets={[cell.asset]}
              index={getIndex(cell.word)}
            />)}
          </Row>
        </Card.Body>
        <Card.Body>
          <Row>
            {resultAssets.length > 0 && <PlayingCard assets={resultAssets} word={this.state.q!} index={getIndex(cell.word)}
/>}
          </Row>
        </Card.Body>
      </Card>
    </Container>;
  }

  private add = () => {
    const imgType: ImageType = "clipart";
    const url = new URL(GOOGLE_URL);
    url.searchParams.append('key', SEARCH_API_KEY!);
    url.searchParams.append('cx', SEARCH_ENGINE_ID!);
    url.searchParams.append('q', this.state.q!);
    url.searchParams.append('imgType', imgType);
    url.searchParams.append('safe', 'active');
    url.searchParams.append('searchType', 'image');
    const urlString = url.toString();
    console.log({ url, urlString });
    this.executeQuery(urlString);
  }

  private async executeQuery(urlString: string) {
    try {
      const result = await this.fetchMemo.get(urlString);
      this.setState({ result });
    } catch (error) {
      this.setState({ error });
    }
  }
}

type ImageType =
  "clipart" |
  "face" |
  "lineart" |
  "stock" |
  "photo" |
  "animated";

export default App;
