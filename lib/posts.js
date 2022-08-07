import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(){
    //Pega os nomes dos arquivos de posts/
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        //Remove a etensao do markdown para pegar o nome do arquivo, que sera usado como ID
        const id = fileName.replace(/\.md$/, '');

        //Le o arquivo markdown como string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        //Usa o gray-matter
        const matterResult = matter(fileContents);

        //Combina a data com o id
        return {
            id,
            ...matterResult.data,
        };
    });
    // Organiza os posts por data
    return allPostsData.sort(({ date: a }, {date: b }) => {
        if (a < b){
            return 1;
        }else if(a > b){
            return -1;
        }else{
            return 0;
        }
    });
}

export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    //Usa o remark pra converter o markdown pra html
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    //Combinar a data com id e o html content
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}