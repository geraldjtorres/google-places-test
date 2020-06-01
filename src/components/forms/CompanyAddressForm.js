import React, { useState } from 'react';
// import { TranslatorProvider, useTranslate } from 'react-translate';
import { Link } from 'react-router-dom';
import '../../App.scss';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';

const CompanyAddressForm = () => {
  const [address, setAddress] = useState({});

  const [showFields, toggleFields] = useState(false);

  const onChange = e => {
    // const targetName = addressComponentse.target.name;

    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const getPlaceDescription = async description => {
    console.log('Place Description: ', description);
    const { place_id } = description;

    try {
      const results = await geocodeByPlaceId(place_id);

      let addressComponents = {
        buildingVillaName: '',
        streetNumber: '',
        city: '',
        streetName: '',
        country: '',
        postCode: '',
      };

      // Get Building/villa name
      const buildingVillaName = description.structured_formatting.main_text;
      addressComponents.buildingVillaName = buildingVillaName;

      // Loop over each address component item and pull out the values
      results[0].address_components.forEach(item => {
        const type = item.types[0];

        switch (type) {
          case 'street_number':
            addressComponents.streetNumber = item.long_name;
            break;
          case 'locality':
          case 'postal_town':
            addressComponents.city = item.long_name;
            break;
          case 'route':
            addressComponents.streetName = item.long_name;
            break;
          case 'country':
            addressComponents.country = item.long_name;
            break;
          case 'postal_code':
            addressComponents.postCode = item.long_name;
            break;
          default:
            break;
        }
        console.log('item', item);
      });
      setAddress({ ...address, ...addressComponents });
      const place = results[0].address_components[0].long_name;
      console.log('address breakdown', address);

      // Show all fields
      toggleFields(!showFields);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='container'>
      <h1>Company Address</h1>

      <div className='form'>
        {showFields === false ? (
          <div class='autocomplete-container'>
            <label htmlFor=''>Your Address</label>
            <GooglePlacesAutocomplete
              autocompletionRequest={{}}
              placeholder='Start typing your address..'
              onSelect={description => getPlaceDescription(description)}
            />

            <p className='show-fields'>
              Can't find your address?{' '}
              <button onClick={() => toggleFields(!showFields)}>
                Enter Manually
              </button>
            </p>
          </div>
        ) : (
          <div className='manual-fields'>
            <label htmlFor=''>Company name</label>
            <input
              type='text'
              name='buildingVillaName'
              value={address.buildingVillaName}
              onChange={e => onChange(e)}
            />

            <label htmlFor=''>Street Name</label>
            <input
              type='text'
              name='streetName'
              value={address.streetName}
              onChange={e => onChange(e)}
            />

            <label htmlFor=''>City</label>
            <input
              type='text'
              name='city'
              value={address.city}
              onChange={e => onChange(e)}
            />

            <label htmlFor=''>Country</label>
            <input
              type='text'
              name='country'
              value={address.country}
              onChange={e => onChange(e)}
            />

            <label htmlFor=''>Post Code / Zip Code</label>
            <input
              type='text'
              name='postCode'
              value={address.postCode}
              onChange={e => onChange(e)}
            />
          </div>
        )}
      </div>

      <div className='footer-btns'>
        <Link to='/home-address-form' className='back-btn'>
          Back
        </Link>

        <Link to='/company-address-form' className='next-btn'>
          Next
        </Link>
      </div>
    </div>
  );
};

export default CompanyAddressForm;
