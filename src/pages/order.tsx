/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react';
import s from '../styles/Order.module.css';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { CartProvider, useCart } from '../context/cart/cart.context';
import { createOrder } from '../context/cart/cart.actions';
import { withCart } from '../HOCs/withCart';
import { withProviders } from '../HOCs/withProviders';
import { Input, InputGroup, Title, FormikSelect, Button, OrderItem, P } from '../components';
import { Shape } from '../types/types';
import { useRouter } from 'next/router';


const Order: FC = () => {
   const router = useRouter();
   
   const { state: { products }, dispatch } = useCart();

   const initialValues: ValuesType = {
      name: '',
      surname: '',
      byFather: '',
      email: '',
      phone: '',
      country: 'Ukraine',
      city: '',
      address: '',
      postalCode: '',
      novaPoshta: '',
   };



   const validationSchema = Yup.object().shape<Shape<ValuesType>>({
      // name: Yup.string().required('Required'),
      // surname: Yup.string().required('Required'),
      // byFather: Yup.string().required('Required'),
      // email: Yup.string().required('Required').email('Invalid email format'),
      // phone: Yup.string().required('Required').matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, { message: 'Invalid phone format' }),
      // country: Yup.string().required('Required').oneOf(['Ukraine', 'Slovakia']),
      // city: Yup.string().required('Required'),
      // address: Yup.string().when('country', {
      //    is: 'Ukraine',
      //    then: Yup.string().notRequired()
      // }),
      // postalCode: Yup.string().when('country', {
      //    is: 'Ukraine',
      //    then: Yup.string().notRequired()
      // }),
      // novaPoshta: Yup.string().when('country', {
      //    is: 'Ukraine',
      //    then: Yup.string().required('Required')
      // })
   });

   const onSubmit = (values: ValuesType, actions: FormikHelpers<ValuesType>) => {
      dispatch(createOrder(values, actions, router));
   };

   return (
      <CartProvider>
         <div className={s.body}>
            <div className={s.orderPage}>
               <div className={s.orderPage__form}>
                  <div className={s.orderPage__form_wrapper}>
                     <Title>Anna Budzinska Art Shop</Title>
                     <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                     >
                        {({ values, isSubmitting, status }) => (
                           <Form>
                              <InputGroup title='Shipping information'>
                                 <Field
                                    placeholder='Country'
                                    id='country'
                                    name='country' 
                                    component={FormikSelect} 
                                 >
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="Slovakia">Slovakia</option>
                                 </Field>

                                 <Field
                                    placeholder={'City'}
                                    half={values.country !== 'Ukraine'}
                                    id='city'
                                    name='city' 
                                    component={Input}
                                 />

                                 {(values.country !== 'Ukraine') && (
                                    <>
                                       <Field
                                          half
                                          placeholder='Postal code'
                                          id='postalCode'
                                          name='postalCode' 
                                          component={Input}
                                          type='text'
                                       />
                                       <Field
                                          placeholder='Address'
                                          id='address'
                                          name='address' 
                                          component={Input}
                                       />
                                    </>
                                 )}
                        
                                 {(values.country === 'Ukraine') && (
                                    <Field
                                       placeholder='Branch of the "Nova Poshta" office'
                                       id='novaPoshta'
                                       name='novaPoshta' 
                                       component={Input}
                                       type='text'
                                    />
                                 )}
                              </InputGroup>

                              <InputGroup title='Contact Information'>
                                 <Field
                                    placeholder='Name'
                                    id='name'
                                    name='name' 
                                    component={Input}
                                    type='text'
                                 />
                                 <Field
                                    placeholder='Surname'
                                    half
                                    id='surname'
                                    name='surname' 
                                    component={Input}
                                    type='text'
                                 />
                                 <Field
                                    placeholder='By father'
                                    half
                                    id='byFather'
                                    name='byFather' 
                                    component={Input}
                                    type='text'
                                 />
                                 <Field
                                    placeholder='Email'
                                    half
                                    id='email'
                                    name='email' 
                                    component={Input}
                                    type='text'
                                 />
                                 <Field
                                    placeholder='Phone'
                                    half
                                    id='phone'
                                    name='phone' 
                                    component={Input}
                                    type='text'
                                 />
                              </InputGroup>

                              {status?.error && (
                                 <div className={s.orderPage__error}>
                                    {status?.error}
                                 </div>
                              )}

                              {status?.success && (
                                 <div className={s.orderPage__success}>
                                    {status?.success}
                                 </div>
                              )}
                              
                              <div className={s.orderPage__buttons}>
                                 <Button
                                    appearance='secondary'
                                    type='button' 
                                    onClick={() => router.push('/cart')}
                                 >
                                    Return co cart
                                 </Button>

                                 <Button type='submit'>
                                    {isSubmitting ? 'Loading...' : 'Make order'}
                                 </Button>
                              </div>
                           </Form>
                        )}
                     </Formik>
                  </div>
               </div>
               <div className={s.orderPage__overwiev}>
                  <div>
                     {products.data.map(({ _id, title, price, images }) => (
                        <OrderItem
                           key={_id}
                           title={title}
                           price={price}
                           img={images ? `${process.env.NEXT_PUBLIC_DOMAIN}/api/products${images[0]}` : ''}
                        />
                     ))}
                  </div>
                  <div className={s.orderPage__overwiev_total}>
                     <div className={s.total}>
                        <div><P>Total</P></div>
                        <div>€{products.data.reduce((prev, curr) => curr.price + prev, 0)}.00</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </CartProvider>
   );
};

export default withProviders(withCart(Order));

export type ValuesType = {
   name: string
   surname: string
   byFather: string
   email: string
   phone: string,
   country: 'Ukraine' | 'Slovakia'
   city: string
   address: string
   postalCode: string
   novaPoshta: string
};
