import React from "react";
import BodySection from "./BodySection";
import { shallow } from "enzyme";

describe("BodySection rendering test", () => {
    it("should render an h2 element with the correct title and children", () => {
        const title = "test title";
        const childrenText = "test children node";

        const wrapper = shallow(
            <BodySection title={title}>
                <p>{childrenText}</p>
            </BodySection>
        );

        const h2 = wrapper.find("h2");
        const p = wrapper.find("p");

        expect(h2.exists()).toBe(true);
        expect(h2.text()).toEqual(title);

        expect(p.exists()).toBe(true);
        expect(p.text()).toEqual(childrenText);
    });
});
