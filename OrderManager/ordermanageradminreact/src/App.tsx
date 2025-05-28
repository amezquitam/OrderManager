import {
  Admin,
  CreateButton,
  CreateProps,
  ExportButton,
  fetchUtils,
  FilterButton,
  houseDarkTheme,
  houseLightTheme,
  ListActions,
  nanoLightTheme,
  Options,
  Resource,
  SelectColumnsButton,
  TopToolbar,
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import authProvider from "./authProvider";

// Componentes genéricos
import {
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { JSX } from "react/jsx-runtime";

const httpClient = (url: string, options: Options) => {
  if (!options.headers) {
    options.headers = new Headers({});
    options.headers.set("Content-Type", "application/json");
  }

  options.headers.set("Accept", "application/json");
  options.headers.set("Authorization", "Basic " + btoa("admin:admin"));

  return fetchUtils.fetchJson(url, options);
};

// Backend base URL
const baseDataProvider = simpleRestProvider(
  "http://192.168.0.101:8080/api/v1",
  httpClient,
);

const dataProvider = {
  ...baseDataProvider,

  getList: async (resource, params) => {
    const result = await baseDataProvider.getList(resource, params);

    console.log(result);

    // Asegura que Content-Range esté presente
    if (!result.total && result.data) {
      result.total = result.data.length;
    }

    return result;
  },

  // Mejora el manejo de errores
  create: async (resource, params) => {
    try {
      console.log(resource);
      return await baseDataProvider.create(resource, params);
    } catch (error) {
      console.error("Error al crear:", error);
      throw new Error(error?.message || "Error inesperado al crear");
    }
  },

  // Puedes sobreescribir otros métodos igual
};

// Create components for each resource
const IngredientCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="unit" />
      <TextInput source="category" />
      <NumberInput source="currentStock" />
      <NumberInput source="minStock" />
    </SimpleForm>
  </Create>
);

const OrderCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="client.id" reference="user">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <SelectInput
        source="status"
        choices={[
          { id: "PENDING", name: "PENDING" },
          { id: "COMPLETED", name: "COMPLETED" },
        ]}
      />
      <DateTimeInput source="timestamp" />
    </SimpleForm>
  </Create>
);

const OrderDetailCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="order.id" reference="order">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput source="product.id" reference="product">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="quantity" />
    </SimpleForm>
  </Create>
);

const PaymentCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="order.id" reference="order">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <DateTimeInput source="timestamp" />
      <NumberInput source="amount" />
      <SelectInput
        source="paymentMethod"
        choices={[
          { id: "CREDIT_CARD", name: "Credit Card" },
          { id: "CASH", name: "Cash" },
        ]}
      />
      <TextInput source="invoiceUrl" />
    </SimpleForm>
  </Create>
);

const ProductCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="restaurant.id" reference="restaurant">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
      <TextInput source="description" />
      <NumberInput source="price" />
      <TextInput source="image" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
);

const ProductIngredientCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="product.id" reference="product">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="ingredient.id" reference="ingredient">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="quantity" />
    </SimpleForm>
  </Create>
);

const PromotionCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="product.id" reference="product">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="description" />
      <DateInput source="startDate" />
      <DateInput source="endDate" />
      <BooleanInput source="visible" />
    </SimpleForm>
  </Create>
);

const PurchaseCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="supplier.id" reference="supplier">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <DateInput source="date" />
    </SimpleForm>
  </Create>
);

const PurchaseIngredientCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="purchase.id" reference="purchase">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <ReferenceInput source="ingredient.id" reference="ingredient">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="quantity" />
    </SimpleForm>
  </Create>
);

const RatingCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="user.id" reference="user">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <ReferenceInput source="product.id" reference="product">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="rating" />
      <TextInput source="comment" />
    </SimpleForm>
  </Create>
);

const RestaurantCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="image" />
      <TextInput source="gmapsLocation" />
      <TextInput source="address" />
      <TextInput source="instagram" />
      <TextInput source="facebook" />
      <TextInput source="whatsapp" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
);

const RoleCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="role" />
    </SimpleForm>
  </Create>
);

const ScheduleCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="restaurant.id" reference="restaurant">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <SelectInput
        source="weekday"
        choices={[
          { id: "MONDAY", name: "Monday" },
          { id: "TUESDAY", name: "Tuesday" },
          { id: "WEDNESDAY", name: "Wednesday" },
          { id: "THURSDAY", name: "Thursday" },
          { id: "FRIDAY", name: "Friday" },
          { id: "SATURDAY", name: "Saturday" },
          { id: "SUNDAY", name: "Sunday" },
        ]}
      />
      <NumberInput source="openingHour" />
      <NumberInput source="closingHour" />
    </SimpleForm>
  </Create>
);

const SupplierCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="restaurant.id" reference="restaurant">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

const TableEntityCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="restaurant.id" reference="restaurant">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

const UserCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="role.id" reference="role">
        <SelectInput optionText="role" />
      </ReferenceInput>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" />
      <TextInput source="password" />
      <BooleanInput source="verified" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
);

const UserRestaurantRolesCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>,
) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="user.id" reference="user">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <ReferenceInput source="restaurant.id" reference="restaurant">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <SelectInput
        source="role"
        choices={[
          { id: "MANAGER", name: "Manager" },
          { id: "STAFF", name: "Staff" },
        ]}
      />
    </SimpleForm>
  </Create>
);

// Main App
export const App = () => (
  <Admin lightTheme={houseLightTheme} darkTheme={houseDarkTheme} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="ingredient"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={IngredientCreate}
    />

    <Resource
      name="order"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={OrderCreate}
    />
    <Resource
      name="order-detail"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={OrderDetailCreate}
    />
    <Resource
      name="payment"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={PaymentCreate}
    />
    <Resource
      name="product"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={ProductCreate}
    />
    <Resource
      name="product-ingredient"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={ProductIngredientCreate}
    />
    <Resource
      name="promotion"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={PromotionCreate}
    />
    <Resource
      name="purchase"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={PurchaseCreate}
    />
    <Resource
      name="purchase-ingredient"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={PurchaseIngredientCreate}
    />
    <Resource
      name="rating"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={RatingCreate}
    />
    <Resource
      name="restaurant"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={RestaurantCreate}
    />
    <Resource
      name="role"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={RoleCreate}
    />
    <Resource
      name="schedule"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={ScheduleCreate}
    />
    <Resource
      name="supplier"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={SupplierCreate}
    />
    <Resource
      name="table-entity"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={TableEntityCreate}
    />
    <Resource
      name="user"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={UserCreate}
    />
    <Resource
      name="user-restaurant-roles"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={UserRestaurantRolesCreate}
    />
  </Admin>
);
