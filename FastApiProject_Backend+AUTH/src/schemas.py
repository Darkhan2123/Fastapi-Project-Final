from pydantic import BaseModel, Field
from typing import Union
import uuid

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Union[uuid.UUID, None] = None

class User(BaseModel):
    user_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    username: str
    email: Union[str, None] = None
    first_name: Union[str, None] = None
    last_name: Union[str, None] = None
    disabled: Union[bool, None] = None

    class Config:
        from_attributes = True

class UserInDB(User):
    hashed_password: str

class UserSignup(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    password: str
    disabled: bool = False
