import BlogCard from "./BlogCard";
import Header from "./Header";
import { useBlogs } from "../hooks/useBlogs";
import { createAvatar } from '@dicebear/core';
import { avataaars,bottts,micah, miniavs} from '@dicebear/collection';

const avatar=(seed:string) =>createAvatar( miniavs, {
  seed:seed
});




export default function Blogs() {
    const { loading, blogs } = useBlogs();
    console.log
    if (loading) {
        return <div>
            loading....
        </div>
    }
    return (
        <>
            <Header />
            <div className="flex justify-center">
                <div className="flex flex-col justify-center max-w-xl p-10  gap-4 min-w-max ">
                    {
                        blogs.map(blog => {
                            const seed = Math.random().toString();
                            const svg = avatar(seed);
                            return (
                                <BlogCard
                                    author={blog.author.name}
                                    published="nov2,2001"
                                    title={blog.title}
                                    content={blog.content}
                                    avatar={svg.toString()}
                                ></BlogCard>
                            )
                        })
                    }

                </div>
            </div>

        </>

    )

}

