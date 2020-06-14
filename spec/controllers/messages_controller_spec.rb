require 'rails_helper'
describe MessagesController do
  let(:user){ create(:user) }
  let(:group){ create(:group) }

  describe '#index' do

    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end
      it "populates an array of messages" do
        messages = create_list(:message, 5, group_id: group.id)
        expect(assigns(:messages)).to match_array messages
      end 
      it "assigns @group" do
        expect(assigns(:group)).to eq group
      end
      it "assigns @message" do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it "renders index" do
        expect(response).to render_template :index
      end
    end 
    context 'not log in' do
      it "renders index" do
        get :index, params: { group_id: group.id }
        expect(response).to redirect_to new_user_session_path
      end
    end
  end

  describe '#create' do
    let(:params){ { user_id: user.id, group_id: group.id, message: attributes_for(:message) } }

    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params,
          format: :json
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).from(0).to(1)
        end
      end

      context 'can not save' do
        let(:invalid_params){ { user_id: user.id, group_id: group.id , message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }
        it 'does not count up message' do
          expect{ subject }.not_to change(Message, :count)
        end
        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end
    context 'not log in' do
      it 'redirect to index' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end