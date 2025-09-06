// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import Paragraph from '@editorjs/paragraph';
// import Quote from '@editorjs/quote';
// import Marker from '@editorjs/marker';
// import Code from '@editorjs/code';
// import InlineCode from '@editorjs/inline-code';
// import LinkTool from '@editorjs/link';
// import Delimiter from '@editorjs/delimiter';
// import ImageTool from '@editorjs/image';
// import Embed from '@editorjs/embed';

// export default function RichEditor({ data, onChange, placeholder = "Start writing..." }) {
//   const ejInstance = useRef();
//   const [isReady, setIsReady] = useState(false);

//   const initEditor = () => {
//     const editor = new EditorJS({
//       holder: 'editorjs',
//       onReady: () => {
//         ejInstance.current = editor;
//         setIsReady(true);
//         console.log('Editor.js is ready to work!');
//       },
//       onChange: async () => {
//         if (ejInstance.current) {
//           try {
//             const content = await ejInstance.current.save();
//             onChange(content);
//           } catch (error) {
//             console.error('Saving failed: ', error);
//           }
//         }
//       },
//       autofocus: true,
//       placeholder: placeholder,
//       tools: {
//         header: {
//           class: Header,
//           inlineToolbar: ['marker', 'link'],
//           config: {
//             placeholder: 'Enter a header',
//             levels: [2, 3, 4],
//             defaultLevel: 3
//           }
//         },
//         paragraph: {
//           class: Paragraph,
//           inlineToolbar: true,
//         },
//         list: {
//           class: List,
//           inlineToolbar: true,
//           config: {
//             defaultStyle: 'unordered'
//           }
//         },
//         quote: {
//           class: Quote,
//           inlineToolbar: true,
//           shortcut: 'CMD+SHIFT+O',
//           config: {
//             quotePlaceholder: 'Enter a quote',
//             captionPlaceholder: 'Quote\'s author',
//           },
//         },
//         marker: {
//           class: Marker,
//           shortcut: 'CMD+SHIFT+M',
//         },
//         code: {
//           class: Code,
//           shortcut: 'CMD+SHIFT+C',
//         },
//         inlineCode: {
//           class: InlineCode,
//           shortcut: 'CMD+SHIFT+M',
//         },
//         linkTool: {
//           class: LinkTool,
//           config: {
//             endpoint: '/api/fetchUrl',
//           }
//         },
//         image: {
//           class: ImageTool,
//           config: {
//             endpoints: {
//               byFile: '/api/uploadEditorImage',
//             }
//           }
//         },
//         embed: {
//           class: Embed,
//           config: {
//             services: {
//               youtube: true,
//               vimeo: true,
//               codepen: {
//                 regex: /https?:\/\/codepen\.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
//                 embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
//                 html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
//                 height: 300,
//                 width: 600,
//                 id: (groups) => groups.join('/embed/')
//               }
//             }
//           }
//         },
//         delimiter: Delimiter,
//       },
//       data: data || { blocks: [] }
//     });
//   };

//   // This will run only once
//   useEffect(() => {
//     if (!ejInstance.current) {
//       initEditor();
//     }

//     return () => {
//       ejInstance?.current?.destroy();
//       ejInstance.current = null;
//     };
//   }, []);

//   return (
//     <div className="prose max-w-none">
//       <div 
//         id="editorjs" 
//         className="min-h-[400px] border rounded-lg p-6 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
//       />
//       {!isReady && (
//         <div className="flex items-center justify-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Code from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import Delimiter from '@editorjs/delimiter';
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';

export default function RichEditor({ data, onChange, placeholder = "Start writing..." }) {
  const ejInstance = useRef(null);
  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const initEditor = () => {
    if (!editorRef.current) return;

    const editor = new EditorJS({
      holder: editorRef.current,
      onReady: () => {
        ejInstance.current = editor;
        setIsReady(true);
        console.log('Editor.js is ready to work!');
      },
      onChange: async () => {
        if (ejInstance.current) {
          try {
            const content = await ejInstance.current.save();
            onChange(content);
          } catch (error) {
            console.error('Saving failed: ', error);
          }
        }
      },
      autofocus: true,
      placeholder,
      tools: {
        header: { class: Header, inlineToolbar: ['marker', 'link'], config: { placeholder: 'Enter a header', levels: [2,3,4], defaultLevel: 3 } },
        paragraph: { class: Paragraph, inlineToolbar: true },
        list: { class: List, inlineToolbar: true, config: { defaultStyle: 'unordered' } },
        quote: { class: Quote, inlineToolbar: true, shortcut: 'CMD+SHIFT+O', config: { quotePlaceholder: 'Enter a quote', captionPlaceholder: "Quote's author" } },
        marker: { class: Marker, shortcut: 'CMD+SHIFT+M' },
        code: { class: Code, shortcut: 'CMD+SHIFT+C' },
        inlineCode: { class: InlineCode, shortcut: 'CMD+SHIFT+M' },
        linkTool: { class: LinkTool, config: { endpoint: '/api/fetchUrl' } },
        image: { class: ImageTool, config: { endpoints: { byFile: '/api/uploadEditorImage' } } },
        embed: { class: Embed, config: { services: { youtube: true, vimeo: true } } },
        delimiter: Delimiter,
      },
      data: data || { blocks: [] }
    });
  };

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div className="prose max-w-none">
      <div
        ref={editorRef}
        className="min-h-[400px] border rounded-lg p-6 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
      />
      {!isReady && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
