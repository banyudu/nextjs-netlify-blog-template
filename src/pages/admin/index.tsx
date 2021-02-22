import dynamic from 'next/dynamic';
import config from './config.json'

const CMS = dynamic(
  () =>
    import('netlify-cms-app').then(async (cms: any) => {
      const { HtmlControl, HtmlPreview } = await import('netlify-cms-widget-html')
      cms.init({ config });
      cms.registerWidget('html', HtmlControl, HtmlPreview)
    }) as any,
  { ssr: false, loading: () => <p>Loading...</p> }
);

const AdminPage: React.FC = () => {
  return <>
    <div id='nc-root' />
    <CMS />
  </>
};

export default AdminPage;
