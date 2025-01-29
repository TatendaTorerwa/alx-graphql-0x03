Advanced Routing Techniques

Overview

Routing is a core feature in Next.js that allows you to map URLs to different components in your application. While basic routing is straightforward, understanding advanced routing techniques can significantly enhance the performance, scalability, and user experience of your application. We will explore advanced routing techniques in Next.js, focusing on dynamic routes, nested routing, API routes, route protection, and performance optimizations.

1. Dynamic Routes

Dynamic routing allows you to create pages with dynamic paths. This is useful when you want to generate pages based on data, such as user profiles or product details.

Creating Dynamic Routes

In Next.js, dynamic routes are created by using square brackets in the file name inside the pages directory.

Example: /pages/products/[id].tsx

The [id].tsx file creates a dynamic route where id can be any value.

Example Component:

import { useRouter } from 'next/router';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Product ID: {id}</h1>;
};

export default ProductPage;

Fetching Data for Dynamic Routes

Next.js provides getStaticPaths and getStaticProps functions to statically generate pages at build time for dynamic routes.

export async function getStaticPaths() {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = await fetchProduct(params.id); // Replace with actual data fetching
  return { props: { product } };
}

const ProductPage = ({ product }) => {
  return <h1>{product.name}</h1>;
};

export default ProductPage;

2. Nested Routing

Nested routing allows you to create routes with sub-routes, which is useful for building hierarchical structures like blogs with categories or users with profiles.

Example Structure:

/pages
  /users
    [id]
      profile.tsx
      settings.tsx

Here, profile.tsx and settings.tsx are sub-routes of the dynamic [id] route.

Accessing Nested Routes:

import { useRouter } from 'next/router';

const UserSettings = () => {
  const router = useRouter();
  const { id } = router.query;

  return <h1>User {id} Settings</h1>;
};

export default UserSettings;

3. API Routes

Next.js allows you to create API routes, which are serverless functions that run on the server side. These can be used to handle form submissions, data fetching, authentication, and more.

Creating an API Route

API routes are created in the pages/api directory.

Example Structure:

/pages/api
  /products
    [id].ts

Example API Route:

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  res.status(200).json({ id, name: `Product ${id}` });
}

Consuming API Routes:

import { useEffect, useState } from 'react';

const ProductPage = ({ id }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  return <h1>{product?.name}</h1>;
};

export default ProductPage;

4. Route Protection

In many applications, certain routes need to be protected, ensuring that only authenticated users can access them. This can be achieved in Next.js using middleware or higher-order components (HOCs).

Example Using HOC

Create an HOC to wrap protected components.

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = false; // Replace with actual authentication check
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

Apply the HOC to a protected page.

import withAuth from '../hoc/withAuth';

const Dashboard = () => {
  return <h1>Protected Dashboard</h1>;
};

export default withAuth(Dashboard);

5. Performance Optimization Techniques

Next.js provides several built-in features to optimize routing and page performance.

Static Site Generation (SSG)

SSG pre-renders pages at build time, making them fast and efficient.

export async function getStaticProps() {
  const data = await fetchData(); // Replace with actual data fetching
  return { props: { data } };
}

const HomePage = ({ data }) => {
  return <h1>Home Page</h1>;
};

export default HomePage;

Incremental Static Regeneration (ISR)

ISR allows you to update static content after the build, based on a time interval.

export async function getStaticProps() {
  const data = await fetchData(); // Replace with actual data fetching
  return { props: { data }, revalidate: 60 };
}

const HomePage = ({ data }) => {
  return <h1>Home Page</h1>;
};

export default HomePage;

Client-Side Routing with next/link

Use the next/link component for client-side routing, which prefetches linked pages, improving navigation speed.

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <Link href="/home">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  );
};

export default Navbar;

Additional Resources

Next.js Routing

Linking and Navigating

Redirecting

Custom Errors
