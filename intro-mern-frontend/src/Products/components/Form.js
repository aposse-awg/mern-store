import React, { useState, useRef } from "react";
import { Form as BulaForm} from "react-bulma-components";

const { Field, Label, Control} = BulaForm;

const Form = ({ handleSubmit }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        size: '',
        description: '',
        imageUrl: '',
    })

    const inputFileRef = useRef()
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const _handleSubmit = (e) => {
        e.preventDefault();
        handleSubmit({ ...formValues, image: inputFileRef.current.files[0] });
        console.log(formValues);
        console.log(inputFileRef.current.files[0]);
    };
    return (
        <form onSubmit={_handleSubmit}>
            <Field>
                <Label>Product Name</Label>
                <Control>
                    <input
                        className="input" // Mantén la clase para el estilo de Bulma
                        placeholder="Product Name"
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                </Control>
            </Field>
            <Field>
                <Label>Product Price</Label>
                <Control>
                    <input
                        className="input" // Mantén la clase para el estilo de Bulma
                        placeholder="Product Price"
                        name="price"
                        type="number"
                        value={formValues.price}
                        onChange={handleChange}
                    />
                </Control>
            </Field>

            <Field>
                <Label>Product Size</Label>
                <Control>
                    <input
                        className="input"
                        placeholder="Product Size"
                        name="size" // <--- ¡DEBE coincidir con la clave del estado!
                        type="number"
                        value={formValues.size} // <--- Si size es undefined, falla.
                        onChange={handleChange}
                    />
                </Control>
            </Field>

            <Field>
                <Label>Product Description</Label>
                <Control>
                    <input
                        className="input" // Mantén la clase para el estilo de Bulma
                        placeholder="Product Description"
                        name="description"
                        type="text"
                        value={formValues.description}
                        onChange={handleChange}
                    />
                </Control>
            </Field>


            <Field>
                <Label>Image</Label>
                <Control>
                    <input
                        className="input" // Mantén la clase para el estilo de Bulma
                        placeholder="Product Image"
                        name="imageUrl"
                        type="file"
                        ref={inputFileRef}
                    />
                </Control>
            </Field>
            <button className="button primary" type="submit">Submit</button>
        </form>
    )
}

export default Form;