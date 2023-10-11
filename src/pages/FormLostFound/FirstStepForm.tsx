import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setAdataTitle, setAdataSecretAnswer, setAdataSecretQuestion, setAdataCategoryId } from "../../redux/form/slice";
import ChooseTypeAd from "./ChooseTypeAd";
import styles from "./AnimationStep.module.css";
import { fetchFormCategories } from "../../redux/form/asyncActions";
import { yupSyncStepFirstLost, yupSyncStepFirstFound } from "./validatorForm";
import { UserIdCategory } from "../../redux/form/types";

const FirstStepForm: React.FC = () => {
    const dispatch = useDispatch();
    const { title, categories, categoryId, switcherLostOrFound, typeId, createdAt, secretQuestion } = useSelector((store: RootState) => store.form.adData);
    console.log("categories", categories);
    const [highlightFields, setHighlightFields] = useState(false);

    useEffect(() => {
        dispatch(fetchFormCategories() as any);
    }, [dispatch]);

    useEffect(() => {
        if (typeId === 2) {
            setHighlightFields(true);
            setTimeout(() => {
                setHighlightFields(false);
            }, 4000);
        }
    }, [typeId]);

    // Define a static array of categories in case categories are not available
    const staticCategories = [
        { _id: "5e9d95cecdf17e644462d631", category: "Documents" },

        { _id: "5e9d95cecdf17e644462d632", category: "Keys" },

        { _id: "5e9d95cecdf17e644462d633", category: "Mobile devices" },

        { _id: "5e9d95cecdf17e644462d634", category: "Bags and purses" },

        { _id: "5e9d95cecdf17e644462d635", category: "Сlothes" },

        { _id: "5e9d95cecdf17e644462d636", category: "Jewelry" },

        { _id: "5e9d95cecdf17e644462d637", category: "Others" },

        { _id: "5ea42acc45a99866a4578fc9", category: "Pets" },
    ];

    return (
        <>
            <ChooseTypeAd />
            <Form.Item name="title" label={typeId === 1 ? "LOST" : "FOUND"} rules={[yupSyncStepFirstLost]}>
                <Input
                    className={highlightFields ? styles.highlight : ""}
                    size="large"
                    type="text"
                    value={title}
                    onChange={(e) => dispatch(setAdataTitle(e.target.value))}
                    placeholder={`INPUT YOUR TITLE`.toLocaleLowerCase()}
                />
            </Form.Item>

            <Form.Item name="category" label="Category" rules={[yupSyncStepFirstLost]}>
                <Select
                    size="large"
                    onChange={(value) => {
                        const selectedCategory = categories.find((category) => category.category === value);
                        if (selectedCategory) {
                            const selectedCategoryId = selectedCategory._id;
                            dispatch(setAdataCategoryId(selectedCategoryId));
                        }
                    }}
                    placeholder="Choose category..."
                >
                    {categories.length > 0
                        ? categories.map((category) => (
                              <Select.Option key={category._id} value={category.category}>
                                  {category.category}
                              </Select.Option>
                          ))
                        : // Use the static categories array if categories are not available
                          staticCategories.map((category) => (
                              <Select.Option key={category._id} value={category.category}>
                                  {category.category}
                              </Select.Option>
                          ))}
                </Select>
            </Form.Item>

            {typeId === 2 ? (
                <>
                    <Tooltip title="Secret question (A person who will want to receive your contact information will have to give an answer to this. If you leave this field empty, your contact details will be available to all users.):">
                        <Form.Item rules={[yupSyncStepFirstFound]} name="secretquestion" label={`Secret question`}>
                            <Input
                                value={secretQuestion}
                                onChange={(e) => dispatch(setAdataSecretQuestion(e.target.value))}
                                size="large"
                                type="text"
                                placeholder="For example, input ID number or passport..."
                                className={highlightFields ? styles.highlight : ""}
                            />
                        </Form.Item>
                    </Tooltip>
                    <Tooltip title="Secret answer (If a person answers exactly your question, how did you answer him, he will immediately receive your contact details. If not, you can check his answer in your account and give it if you want.):">
                        <Form.Item rules={[yupSyncStepFirstFound]} name="secretanswer" label={`Secret answer`}>
                            <Input
                                value={createdAt}
                                onChange={(e) => dispatch(setAdataSecretAnswer(e.target.value))}
                                size="large"
                                type="text"
                                placeholder="Your secret answer"
                                className={highlightFields ? styles.highlight : ""}
                            />
                        </Form.Item>
                    </Tooltip>
                </>
            ) : null}
        </>
    );
};

export default FirstStepForm;
